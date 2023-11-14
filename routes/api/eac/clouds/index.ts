// deno-lint-ignore-file no-explicit-any
import { Handlers } from "$fresh/server.ts";
import { redirectRequest } from "@fathym/common";
import {
  EaCCloudAzureDetails,
  EaCEnvironmentDetails,
  EaCStatusProcessingTypes,
  waitForStatus,
} from "@fathym/eac";
import { eacSvc } from "../../../../services/eac.ts";
import { OpenBiotechEaC } from "../../../../src/eac/OpenBiotechEaC.ts";
import { OpenBiotechManagerState } from "../../../../src/OpenBiotechManagerState.tsx";

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
          } as EaCCloudAzureDetails,
          Type: "Azure",
        },
      },
    };

    const commitResp = await eacSvc.Commit<OpenBiotechEaC>(eac);

    const status = await waitForStatus(
      eacSvc,
      commitResp.EnterpriseLookup,
      commitResp.CommitID,
    );

    if (status.Processing == EaCStatusProcessingTypes.COMPLETE) {
      return redirectRequest("/cloud");
    } else {
      return redirectRequest(
        `/cloud?error=${encodeURIComponent(status.Messages["Error"])}`,
      );
    }
  },
};
