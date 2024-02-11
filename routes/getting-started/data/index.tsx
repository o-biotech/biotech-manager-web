import { Handlers, PageProps } from "$fresh/server.ts";
import { DisplayStyleTypes, Hero, HeroStyleTypes } from "@fathym/atomic";
import { DataStepsFeatures } from "../../../components/organisms/features/DataStepsFeatures.tsx";
import { DataPhaseTypes } from "../../../src/DataPhaseTypes.tsx";
import { OpenBiotechManagerState } from "../../../src/OpenBiotechManagerState.tsx";
import { redirectRequest } from "@fathym/common";
import { OpenBiotechEaC } from "../../../src/eac/OpenBiotechEaC.ts";
import { loadEaCSvc } from "../../../configs/eac.ts";

interface DataPageData {
  dashboardTypes: string[];

  dataPhase: DataPhaseTypes;

  deviceKeys: Record<string, string>;

  iotHubKeys: Record<string, string>;

  jwt: string;

  kustoCluster: string;

  kustoLocation: string;

  resGroupLookup: string;
}

export const handler: Handlers<DataPageData | null, OpenBiotechManagerState> = {
  async GET(_, ctx) {
    if (ctx.state.Phase < 2) {
      return redirectRequest("/");
    }

    const eacSvc = await loadEaCSvc(ctx.state.EaCJWT!);

    const eacConnections = await eacSvc.Connections<OpenBiotechEaC>({
      EnterpriseLookup: ctx.state.EaC!.EnterpriseLookup!,
      Clouds: {
        [ctx.state.Cloud.CloudLookup!]: {
          ResourceGroups: {
            [ctx.state.Cloud.ResourceGroupLookup!]: {
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
        ["iot-flow"]: {
          Devices: {},
        },
      },
    });

    const iotFlowResource =
      eacConnections.Clouds![ctx.state.Cloud.CloudLookup!].ResourceGroups![
        ctx.state.Cloud.ResourceGroupLookup!
      ].Resources!["iot-flow"];

    const resKeys = iotFlowResource.Keys as Record<string, unknown>;

    const shortName = ctx.state.Cloud.ResourceGroupLookup!.split("-")
      .map((p) => p.charAt(0))
      .join("");

    const iotHubKeys = resKeys[
      `Microsoft.Devices/IotHubs/${shortName}-iot-hub`
    ] as Record<string, string>;

    const deviceLookups = Object.keys(
      eacConnections.IoT!["iot-flow"].Devices || {},
    );

    const deviceKeys = deviceLookups.reduce((prev, deviceLookup) => {
      const keys = eacConnections.IoT!["iot-flow"].Devices![deviceLookup]
        .Keys as Record<string, string>;

      prev[deviceLookup] = keys.primaryKey;

      return prev;
    }, {} as Record<string, string>);

    const resLocations = iotFlowResource.Resources!["iot-flow-warm"]
      .Locations as Record<string, string>;

    const kustoCluster = `${shortName}-data-explorer`;

    const kustoLocation =
      resLocations[`Microsoft.Kusto/clusters/${kustoCluster}`];

    const dashboardLookups = Object.keys(
      ctx.state.EaC!.IoT!["iot-flow"].Dashboards || {},
    );

    const dashboardTypes = dashboardLookups.map((dashboardLookup) => {
      const dashboard =
        ctx.state.EaC!.IoT!["iot-flow"].Dashboards![dashboardLookup];

      return dashboard.Details!.Type!;
    });

    const data: DataPageData = {
      dashboardTypes: dashboardTypes,
      dataPhase: ctx.state.Data.Phase,
      deviceKeys: deviceKeys,
      iotHubKeys: iotHubKeys,
      jwt: ctx.state.Devices.JWT,
      kustoCluster: kustoCluster,
      kustoLocation: kustoLocation,
      resGroupLookup: ctx.state.Cloud.ResourceGroupLookup!,
    };

    return ctx.render(data);
  },
};

export default function Data({
  data,
}: PageProps<DataPageData | null, OpenBiotechManagerState>) {
  return (
    <div>
      <Hero
        title="Data Flows, Dashboards and APIs"
        callToAction="Get device data flowing, explore through default dashboards and share with downstream analytics, alerts or ML services."
        class="[&_*]:mx-auto [&>*>*]:w-full bg-hero-pattern text-center"
        heroStyle={HeroStyleTypes.None}
        displayStyle={DisplayStyleTypes.Center | DisplayStyleTypes.Large}
      />

      <DataStepsFeatures
        dashboardTypes={data!.dashboardTypes}
        dataPhase={data!.dataPhase}
        deviceKeys={data!.deviceKeys}
        iotHubKeys={data!.iotHubKeys}
        jwt={data!.jwt}
        kustoCluster={data!.kustoCluster}
        kustoLocation={data!.kustoLocation}
        resGroupLookup={data!.resGroupLookup}
      />
    </div>
  );
}
