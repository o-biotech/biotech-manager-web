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
import { CloudIoTForm } from "../../../../components/organisms/cloud/iot.form.tsx";

export type EaCIoTSettingsPageData = {
  deviceKeys: Record<string, string>;

  entLookup: string;

  hasGitHubAuth: boolean;

  iotHubKeys: Record<string, string>;

  manageCloudLookup: string;

  manageResourceGroupLookup: string;

  organizationOptions: string[];
  // resGroupOptions: DataLookup[];
};

export const handler: Handlers<
  EaCIoTSettingsPageData,
  OpenBiotechManagerState
> = {
  async GET(_, ctx) {
    const manageIoTLookup: string = ctx.params.iotLookup;

    const manageIoT: EaCIoTAsCode = ctx.state.EaC!.IoT![manageIoTLookup]!;

    const data: EaCIoTSettingsPageData = {
      deviceKeys: {},
      entLookup: ctx.state.EaC!.EnterpriseLookup!,
      hasGitHubAuth: !!ctx.state.GitHub,
      iotHubKeys: {},
      manageCloudLookup: manageIoT.CloudLookup!,
      manageResourceGroupLookup: manageIoT.ResourceGroupLookup!,
      organizationOptions: [],
      // resGroupOptions: [],
    };

    const eacSvc = await loadEaCSvc(ctx.state.EaCJWT!);

    const connsReq: OpenBiotechEaC = {
      EnterpriseLookup: ctx.state.EaC!.EnterpriseLookup!,
      Clouds: {
        [data.manageCloudLookup]: {
          ResourceGroups: {
            [data.manageResourceGroupLookup!]: {
              Resources: {
                ["iot-flow"]: {
                  Resources: {},
                },
              },
            },
          },
        },
      },
      IoT: {
        [manageIoTLookup]: {
          Devices: {},
        },
      },
    };

    if (ctx.state.GitHub && ctx.state.EaC!.SourceConnections) {
      const sourceKey = `GITHUB://${ctx.state.GitHub!.Username}`;

      if (ctx.state.EaC!.SourceConnections![sourceKey]) {
        connsReq.SourceConnections = {
          [sourceKey]: {},
        };
      }
    }

    const eacConnections = await eacSvc.Connections(connsReq);

    if (eacConnections.SourceConnections) {
      const sourceKey = `GITHUB://${ctx.state.GitHub!.Username}`;

      data.organizationOptions = Object.keys(
        eacConnections.SourceConnections[sourceKey].Organizations || {},
      );
    }

    const iotFlowConnsResource =
      eacConnections.Clouds![data.manageCloudLookup].ResourceGroups![
        data.manageResourceGroupLookup!
      ].Resources!["iot-flow"];

    const resKeys = iotFlowConnsResource.Keys as Record<string, unknown>;

    const shortName = data
      .manageResourceGroupLookup!.split("-")
      .map((p) => p.charAt(0))
      .join("");

    data.iotHubKeys = resKeys[
      `Microsoft.Devices/IotHubs/${shortName}-iot-hub`
    ] as Record<string, string>;

    const deviceLookups = Object.keys(
      eacConnections.IoT![manageIoTLookup].Devices || {},
    );

    data.deviceKeys = deviceLookups.reduce((prev, deviceLookup) => {
      const keys = eacConnections.IoT![manageIoTLookup].Devices![deviceLookup]
        .Keys as Record<string, string>;

      prev[deviceLookup] = keys.primaryKey;

      return prev;
    }, {} as Record<string, string>);

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
          deviceKeys={data.deviceKeys}
          hasGitHubAuth={data.hasGitHubAuth}
          iotHubKeys={data.iotHubKeys}
          organizations={data.organizationOptions}
          resGroupLookup={data.manageResourceGroupLookup}
        />
      </div>
    </>
  );
}
