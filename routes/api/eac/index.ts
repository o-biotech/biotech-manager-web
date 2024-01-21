// deno-lint-ignore-file no-explicit-any
import { Handlers } from "$fresh/server.ts";
import { redirectRequest, respond } from "@fathym/common";
import {
  EaCCommitResponse,
  EaCStatusProcessingTypes,
  waitForStatusWithFreshJwt,
} from "@fathym/eac";
import { OpenBiotechEaC } from "../../../src/eac/OpenBiotechEaC.ts";
import { OpenBiotechManagerState } from "../../../src/OpenBiotechManagerState.tsx";
import { denoKv } from "../../../configs/deno-kv.config.ts";
import { loadEaCSvc } from "../../../configs/eac.ts";

export const handler: Handlers<any, OpenBiotechManagerState> = {
  GET(_req, ctx) {
    return respond(ctx.state.EaC || {});
  },

  async POST(req, ctx) {
    const formData = await req.formData();

    const saveEaC: OpenBiotechEaC = {
      EnterpriseLookup: formData.get("entLookup") as string | undefined,
      Details: {
        Name: formData.get("name") as string,
        Description: formData.get("description") as string,
      },
    };

    const parentEaCSvc = await loadEaCSvc();

    let eacCall: Promise<EaCCommitResponse>;

    if (saveEaC.EnterpriseLookup) {
      const username = ctx.state.Username;

      const jwt = await parentEaCSvc.JWT(saveEaC.EnterpriseLookup, username);

      const eacSvc = await loadEaCSvc(jwt.Token);

      eacCall = eacSvc.Commit<OpenBiotechEaC>(saveEaC, 60);
    } else {
      eacCall = parentEaCSvc.Create<OpenBiotechEaC>(
        saveEaC,
        ctx.state.Username,
        60,
      );
    }

    const saveResp = await eacCall;

    const status = await waitForStatusWithFreshJwt(
      parentEaCSvc,
      saveResp.EnterpriseLookup,
      saveResp.CommitID,
      ctx.state.Username,
    );

    if (status.Processing == EaCStatusProcessingTypes.COMPLETE) {
      if (!ctx.state.EaC) {
        await denoKv.set(
          ["User", ctx.state.Username, "Current", "EaC"],
          saveResp.EnterpriseLookup,
        );
      }

      return redirectRequest("/");
    } else {
      return redirectRequest(
        `/?error=${
          encodeURIComponent(
            status.Messages["Error"] as string,
          )
        }&commitId=${saveResp.CommitID}`,
      );
    }
  },
};
