// deno-lint-ignore-file no-explicit-any
import { Handlers } from "$fresh/server.ts";
import { redirectRequest, respond } from "@fathym/common";
import {
  EaCStatusProcessingTypes,
  UserGitHubConnection,
  waitForStatus,
} from "@fathym/eac";
import { eacSvc } from "../../../services/eac.ts";
import { gitHubOAuth } from "../../../services/github.ts";
import { OpenBiotechEaC } from "../../../src/eac/OpenBiotechEaC.ts";
import { OpenBiotechManagerState } from "../../../src/OpenBiotechManagerState.tsx";
import { denoKv } from "../../../configs/deno-kv.config.ts";

export const handler: Handlers<any, OpenBiotechManagerState> = {
  GET(_req, ctx) {
    return respond(ctx.state.EaC || {});
  },

  async POST(req, ctx) {
    const formData = await req.formData();

    const sessionId = await gitHubOAuth.getSessionId(req);

    const currentConn = await denoKv.get<UserGitHubConnection>([
      "User",
      "Session",
      sessionId!,
      "GitHub",
      "GitHubConnection",
    ]);

    const newEaC: OpenBiotechEaC = {
      Details: {
        Name: formData.get("name") as string,
        Description: formData.get("description") as string,
      },
      SourceConnections: {
        [`GITHUB://${currentConn.value!.Username}`]: {
          Details: {
            Name: `${currentConn.value!.Username} GitHub Connection`,
            Description: `The GitHub connection to use for user ${
              currentConn.value!.Username
            }.`,
            RefreshToken: currentConn.value?.RefreshToken!,
            Token: currentConn.value?.Token!,
          },
          GitHubAppLookup: Deno.env.get("GITHUB_APP_ID"),
        },
      },
    };

    const createResp = await eacSvc.Create<OpenBiotechEaC>(newEaC, 60);

    const status = await waitForStatus(
      eacSvc,
      createResp.EnterpriseLookup,
      createResp.CommitID,
    );

    if (status.Processing == EaCStatusProcessingTypes.COMPLETE) {
      if (!ctx.state.EaC) {
        await denoKv.set(
          ["User", ctx.state.Username, "Current", "EaC"],
          createResp.EnterpriseLookup,
        );
      }

      return redirectRequest("/");
    } else {
      return redirectRequest(
        `/?error=${
          encodeURIComponent(
            status.Messages["Error"] as string,
          )
        }&commitId=${createResp.CommitID}`,
      );
    }
  },
};
