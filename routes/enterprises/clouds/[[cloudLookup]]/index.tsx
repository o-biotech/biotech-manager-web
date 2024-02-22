import { Handlers, PageProps } from "$fresh/server.ts";
import {
  DisplayStyleTypes,
  EaCManageCloudForm,
  EaCManageDevOpsActionForm,
  Hero,
  HeroStyleTypes,
} from "@fathym/atomic";
import { redirectRequest, respond } from "@fathym/common";
import {
  EaCCloudAsCode,
  EaCCloudAzureDetails,
  EaCStatusProcessingTypes,
  loadEaCSvc,
  waitForStatus,
} from "@fathym/eac";
import { OpenBiotechManagerState } from "../../../../src/OpenBiotechManagerState.tsx";
import { OpenBiotechEaC } from "../../../../src/eac/OpenBiotechEaC.ts";
import { DeleteAction } from "../../../../islands/molecules/DeleteAction.tsx";

export type EaCCloudsPageData = {
  entLookup: string;

  manageCloud?: EaCCloudAsCode;

  manageCloudLookup?: string;
};

export const handler: Handlers<
  EaCCloudsPageData,
  OpenBiotechManagerState
> = {
  GET(_, ctx) {
    const manageCloudLookup: string = ctx.params.cloudLookup;

    let manageCloud: EaCCloudAsCode | undefined = undefined;

    if (manageCloudLookup) {
      manageCloud = ctx.state.EaC!.Clouds![manageCloudLookup]!;

      if (!manageCloud) {
        return redirectRequest("/enterprises/clouds");
      }
    }

    const data: EaCCloudsPageData = {
      entLookup: ctx.state.EaC!.EnterpriseLookup!,
      manageCloud: manageCloud,
      manageCloudLookup: manageCloudLookup,
    };

    return ctx.render(data);
  },

  async POST(req, ctx) {
    const formData = await req.formData();

    const cloudLookup = formData.get("cloudLookup") as string;

    const saveEaC: OpenBiotechEaC = {
      EnterpriseLookup: formData.get("entLookup") as string,
      Clouds: {
        [cloudLookup]: {
          Details: {
            Name: formData.get("name") as string,
            Description: formData.get("description") as string,
            TenantID: formData.get("tenant-id") as string,
            SubscriptionID: formData.get("subscription-id") as string,
            ApplicationID: formData.get("application-id") as string,
            AuthKey: formData.get("auth-key") as string,
            Type: "Azure",
          } as EaCCloudAzureDetails,
        },
      },
    };

    const eacSvc = await loadEaCSvc(ctx.state.EaCJWT!);

    const commitResp = await eacSvc.Commit<OpenBiotechEaC>(saveEaC, 60);

    const status = await waitForStatus(
      eacSvc,
      commitResp.EnterpriseLookup,
      commitResp.CommitID,
    );

    if (status.Processing == EaCStatusProcessingTypes.COMPLETE) {
      return redirectRequest("/enterprises/clouds");
    } else {
      return redirectRequest(
        `/enterprises/clouds?commitId=${commitResp.CommitID}`,
      );
    }
  },

  async DELETE(req, ctx) {
    const cloudLookup = ctx.params.cloudLookup;

    const eacSvc = await loadEaCSvc(ctx.state.EaCJWT!);

    const deleteResp = await eacSvc.Delete(
      {
        EnterpriseLookup: ctx.state.EaC!.EnterpriseLookup,
        Clouds: {
          [cloudLookup]: null,
        },
      },
      false,
      60,
    );

    const status = await waitForStatus(
      eacSvc,
      deleteResp.EnterpriseLookup!,
      deleteResp.CommitID,
    );

    return respond(status);
  },
};

export default function EaCClouds({
  data,
}: PageProps<EaCCloudsPageData, OpenBiotechManagerState>) {
  const details: EaCCloudAzureDetails | undefined = data.manageCloud
    ?.Details as EaCCloudAzureDetails;
  return (
    <>
      <Hero
        title="Manage EaC Clouds"
        callToAction="Configure clouds to enable connections to manage your cloud infrastructure."
        class="[&_*]:mx-auto [&>*>*]:w-full bg-[#000028] text-center"
        heroStyle={HeroStyleTypes.None}
        displayStyle={DisplayStyleTypes.Center | DisplayStyleTypes.Large}
      >
      </Hero>

      <EaCManageCloudForm
        entLookup={data.entLookup}
        cloudLookup={data.manageCloudLookup || ""}
        cloudName={details?.Name || ""}
        cloudDescription={details?.Description || ""}
        cloudTenantID={details?.TenantID || ""}
        cloudSubscriptionID={details?.SubscriptionID || ""}
        cloudApplicationID={details?.ApplicationID || ""}
        cloudAuthKey={details?.AuthKey || ""}
      />

      {data.manageCloudLookup && (
        <div class="max-w-sm mx-auto mb-4">
          <DeleteAction
            message={`Are you sure you want to delete EaC Cloud '${data.manageCloudLookup}?`}
          >
            Delete EaC DevOps Action
          </DeleteAction>
        </div>
      )}
    </>
  );
}
