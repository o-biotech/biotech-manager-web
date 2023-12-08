// deno-lint-ignore-file no-explicit-any
import { Handlers } from "$fresh/server.ts";
import { redirectRequest, respond } from "@fathym/common";
import {
  EaCStatus,
  EaCStatusProcessingTypes,
  sleep,
  waitForStatus,
} from "@fathym/eac";
import { eacSvc } from "../../../services/eac.ts";
import { OpenBiotechEaC } from "../../../src/eac/OpenBiotechEaC.ts";
import { OpenBiotechManagerState } from "../../../src/OpenBiotechManagerState.tsx";
import { denoKv } from "../../../configs/deno-kv.config.ts";

export const handler: Handlers<any, OpenBiotechManagerState> = {
  async GET(req, ctx) {
    return respond(ctx.state.EaC || {});
  },

  async POST(req, ctx) {
    const formData = await req.formData();

    const newEaC: OpenBiotechEaC = {
      Details: {
        Name: formData.get("name") as string,
        Description: formData.get("description") as string,
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
