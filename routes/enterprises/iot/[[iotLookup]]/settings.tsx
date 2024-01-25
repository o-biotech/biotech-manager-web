import { Handlers, PageProps } from "$fresh/server.ts";
import {
  DataLookup,
  DisplayStyleTypes,
  EaCManageCloudForm,
  EaCManageDevOpsActionForm,
  Hero,
  HeroStyleTypes,
} from "@fathym/atomic";
import { redirectRequest, respond } from "@fathym/common";
import {
  EaCCloudAzureDetails,
  EaCIoTAsCode,
  EaCStatusProcessingTypes,
  waitForStatus,
} from "@fathym/eac";
import { OpenBiotechManagerState } from "../../../../src/OpenBiotechManagerState.tsx";
import { loadEaCSvc } from "../../../../configs/eac.ts";
import { OpenBiotechEaC } from "../../../../src/eac/OpenBiotechEaC.ts";
import { ResourceGroupIoTSettings } from "../../../../islands/organisms/cloud/iot/res-group-iot-settings.tsx";
import { setupEaCIoTFlow } from "../../../../src/utils/eac/setupEaCIoTFlow.ts";

export type EaCIoTSettingsPageData = {
  entLookup: string;

  hasGitHubAuth: boolean;

  manageCloudLookup: string;

  organizationOptions: string[];

  resGroupOptions: DataLookup[];
};

export const handler: Handlers<
  EaCIoTSettingsPageData,
  OpenBiotechManagerState
> = {
  async GET(_, ctx) {
    const manageIoTLookup: string = ctx.params.iotLookup;

    const manageIoT: EaCIoTAsCode = ctx.state.EaC!.IoT![manageIoTLookup]!;

    const data: EaCIoTSettingsPageData = {
      entLookup: ctx.state.EaC!.EnterpriseLookup!,
      hasGitHubAuth: !!ctx.state.GitHub,
      manageCloudLookup: manageIoT.CloudLookup!,
      organizationOptions: [],
      resGroupOptions: [],
    };

    if (ctx.state.GitHub && ctx.state.EaC!.SourceConnections) {
      const sourceKey = `GITHUB://${ctx.state.GitHub!.Username}`;

      if (ctx.state.EaC!.SourceConnections![sourceKey]) {
        const eacSvc = await loadEaCSvc(ctx.state.EaCJWT!);

        const eacConnections = await eacSvc.Connections<OpenBiotechEaC>({
          EnterpriseLookup: ctx.state.EaC!.EnterpriseLookup!,
          SourceConnections: {
            [sourceKey]: {},
          },
        });

        if (eacConnections.SourceConnections) {
          data.organizationOptions = Object.keys(
            eacConnections.SourceConnections[sourceKey].Organizations || {},
          );
        }
      }
    }

    const cloud = ctx.state.EaC!.Clouds![data.manageCloudLookup]!;

    for (const resGroupLookup in cloud.ResourceGroups) {
      const resGroup = cloud.ResourceGroups[resGroupLookup];

      data.resGroupOptions.push({
        Lookup: resGroupLookup,
        Name: resGroup.Details!.Name!,
      });
    }

    return ctx.render(data);
  },

  async POST(req, ctx) {
    const formData = await req.formData();

    const cloudLookup = formData.get("cloudLookup") as string;

    const resGroupLookup = formData.get("resGroupLookup") as string;

    const resLookup = (formData.get("resLookup") as string) || `iot-flow`;

    const storageFlowCold = !!(formData.get("storageFlowCold") as string);

    const storageFlowWarm = !!(formData.get("storageFlowWarm") as string);

    const storageFlowHot = !!(formData.get("storageFlowHot") as string);

    const gitHubOrg = formData.get("gitHubOrg") as string;

    const gitHubRepo = formData.get("gitHubRepo") as string;

    const gitHubUsername = ctx.state.GitHub?.Username!;

    const saveEaC = setupEaCIoTFlow(
      ctx.state.EaC!.EnterpriseLookup!,
      ctx.state.EaC!.Clouds!,
      cloudLookup,
      resGroupLookup,
      resLookup,
      storageFlowCold,
      storageFlowWarm,
      storageFlowHot,
      gitHubOrg,
      gitHubRepo,
      gitHubUsername,
    );

    const eacSvc = await loadEaCSvc(ctx.state.EaCJWT!);

    const commitResp = await eacSvc.Commit<OpenBiotechEaC>(saveEaC, 60);

    const status = await eacSvc.Status(
      commitResp.EnterpriseLookup,
      commitResp.CommitID,
    );

    if (
      status.Processing == EaCStatusProcessingTypes.PROCESSING ||
      status.Processing == EaCStatusProcessingTypes.QUEUED
    ) {
      return redirectRequest(
        `/commit/${commitResp.CommitID}/status?successRedirect=/enterprises/iot/${cloudLookup}&errorRedirect=/enterprises/iot/${cloudLookup}/settings`,
      );
    } else {
      return redirectRequest(
        `/enterprises/iot/${cloudLookup}/settings?commitId=${commitResp.CommitID}`,
      );
    }
  },
};

export default function EaCIoTSettings({
  data,
}: PageProps<EaCIoTSettingsPageData, OpenBiotechManagerState>) {
  return (
    <>
      <Hero
        title="Manage EaC IoT Settings"
        callToAction="Determine the infrastructure to deploy to your IoT cloud resource groups."
        class="[&_*]:mx-auto [&>*>*]:w-full bg-hero-pattern text-center"
        heroStyle={HeroStyleTypes.None}
        displayStyle={DisplayStyleTypes.Center | DisplayStyleTypes.Large}
      >
      </Hero>

      <div class="max-w-sm mx-auto mb-4">
        <ResourceGroupIoTSettings
          cloudLookup={data.manageCloudLookup}
          hasGitHubAuth={data.hasGitHubAuth}
          organizations={data.organizationOptions}
          resGroupOptions={data.resGroupOptions}
        />
      </div>
    </>
  );
}
