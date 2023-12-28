// deno-lint-ignore-file no-explicit-any
import { Handlers } from "$fresh/server.ts";
import { redirectRequest } from "@fathym/common";
import {
  EaCCloudAzureDetails,
  EaCStatusProcessingTypes,
  waitForStatus,
} from "@fathym/eac";
import { OpenBiotechEaC } from "../../../../src/eac/OpenBiotechEaC.ts";
import { OpenBiotechManagerState } from "../../../../src/OpenBiotechManagerState.tsx";
import { loadEaCSvc } from "../../../../configs/eac.ts";

export const handler: Handlers<any, OpenBiotechManagerState> = {
  async POST(req, ctx) {
    const formData = await req.formData();

    const cloudLookup = (formData.get("cloudLookup") as string) ||
      crypto.randomUUID();

    const eac: OpenBiotechEaC = {
      EnterpriseLookup: ctx.state.EaC!.EnterpriseLookup,
      Clouds: {
        [cloudLookup]: {
          Details: {
            Name: formData.get("name") as string,
            Description: formData.get("description") as string,
            ApplicationID: formData.get("application-id") as string,
            AuthKey: formData.get("auth-key") as string,
            SubscriptionID: formData.get("subscription-id") as string,
            TenantID: formData.get("tenant-id") as string,
            Type: "Azure",
          } as EaCCloudAzureDetails,
        },
      },
    };

    const eacSvc = await loadEaCSvc(ctx.state.EaCJWT!);

    const commitResp = await eacSvc.Commit(eac, 60);

    const status = await waitForStatus(
      eacSvc,
      commitResp.EnterpriseLookup,
      commitResp.CommitID,
    );

    if (status.Processing == EaCStatusProcessingTypes.COMPLETE) {
      return redirectRequest("/cloud");
    } else {
      return redirectRequest(
        `/cloud?error=${
          encodeURIComponent(
            status.Messages["Error"] as string,
          )
        }&commitId=${commitResp.CommitID}`,
      );
    }
  },
};
