// deno-lint-ignore-file no-explicit-any
import { Handlers } from "$fresh/server.ts";
import { redirectRequest, respond } from "@fathym/common";
import {
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

    const newEaC: OpenBiotechEaC = {
      Details: {
        Name: formData.get("name") as string,
        Description: formData.get("description") as string,
      },
    };

    const parentEaCSvc = await loadEaCSvc();

    const createResp = await parentEaCSvc.Create<OpenBiotechEaC>(
      newEaC,
      ctx.state.Username,
      60,
    );

    const status = await waitForStatusWithFreshJwt(
      parentEaCSvc,
      createResp.EnterpriseLookup,
      createResp.CommitID,
      ctx.state.Username,
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
