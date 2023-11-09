import { HandlerContext, Handlers } from "$fresh/server.ts";
import { redirectRequest } from "@fathym/common";
import { EaCStatus, EaCStatusProcessingTypes, sleep } from "@fathym/eac";
import { eacSvc } from "../../../services/eac.ts";
import { OpenBiotechEaC } from "../../../src/eac/OpenBiotechEaC.ts";
import { OpenBiotechManagerState } from "../../../src/OpenBiotechManagerState.tsx";
import { denoKv } from "../../../configs/deno-kv.config.ts";

export const handler: Handlers<any, OpenBiotechManagerState> = {
  async POST(req, ctx) {
    const formData = await req.formData();

    const newEaC: OpenBiotechEaC = {
      Details: {
        Name: formData.get("name") as string,
        Description: formData.get("description") as string,
      },
    };

    const createResp = await eacSvc.Create<OpenBiotechEaC>(newEaC);

    let status: EaCStatus | null = null;

    do {
      status = await eacSvc.Status(
        createResp.EnterpriseLookup,
        createResp.CommitID,
      );

      await sleep(500);
    } while (
      status?.Processing != EaCStatusProcessingTypes.COMPLETE &&
      status?.Processing != EaCStatusProcessingTypes.ERROR
    );

    if (status.Processing == EaCStatusProcessingTypes.COMPLETE) {
      if (!ctx.state.EaC) {
        await denoKv.set([
          "User",
          ctx.state.Username,
          "Current",
          "EaC",
        ], createResp.EnterpriseLookup);
      
      }

      return redirectRequest("/");
    } else {
      return redirectRequest(
        `/?error=${encodeURIComponent(status.Messages["Error"])}`,
      );
    }
  },
};
