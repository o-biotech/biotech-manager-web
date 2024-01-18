// deno-lint-ignore-file no-explicit-any
import { Handlers } from "$fresh/server.ts";
import { redirectRequest } from "@fathym/common";
import { EaCStatusProcessingTypes, waitForStatus } from "@fathym/eac";
import { OpenBiotechManagerState } from "../../../../src/OpenBiotechManagerState.tsx";
import { OpenBiotechEaC } from "../../../../src/eac/OpenBiotechEaC.ts";
import { loadEaCSvc } from "../../../../configs/eac.ts";

export const handler: Handlers<any, OpenBiotechManagerState> = {
  async POST(req, ctx) {
    const formData = await req.formData();

    const cloudLookup = formData.get("cloudLookup") as string;

    const resGroupLookup = formData.get("resGroupLookup") as string;

    const eac: OpenBiotechEaC = {
      EnterpriseLookup: ctx.state.EaC!.EnterpriseLookup,
      Clouds: {
        [cloudLookup]: {
          ResourceGroups: {
            [resGroupLookup]: {
              Details: {
                Name: resGroupLookup,
                Description: formData.get("description") as string,
                Location: formData.get("location") as string,
                Order: 1,
              },
            },
          },
        },
      },
    };

    const eacSvc = await loadEaCSvc(ctx.state.EaCJWT!);

    const commitResp = await eacSvc.Commit<OpenBiotechEaC>(eac, 60);

    const status = await waitForStatus(
      eacSvc,
      commitResp.EnterpriseLookup,
      commitResp.CommitID,
    );

    if (status.Processing == EaCStatusProcessingTypes.COMPLETE) {
      return redirectRequest("/getting-started/cloud");
    } else {
      return redirectRequest(
        `/getting-started/cloud?error=${
          encodeURIComponent(
            status.Messages["Error"] as string,
          )
        }&commitId=${commitResp.CommitID}`,
      );
    }
  },
};
