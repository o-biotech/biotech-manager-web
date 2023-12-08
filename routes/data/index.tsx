import { Handlers, PageProps } from "$fresh/server.ts";
import { DisplayStyleTypes, Hero, HeroStyleTypes } from "@fathym/atomic";
import { DataStepsFeatures } from "../../components/organisms/features/DataStepsFeatures.tsx";
import { DataPhaseTypes } from "../../src/DataPhaseTypes.tsx";
import { OpenBiotechManagerState } from "../../src/OpenBiotechManagerState.tsx";
import { redirectRequest } from "@fathym/common";
import { eacSvc } from "../../services/eac.ts";
import { OpenBiotechEaC } from "../../src/eac/OpenBiotechEaC.ts";

interface DataPageData {
  apiBase: string;

  dataPhase: DataPhaseTypes;

  deviceKeys: Record<string, string>;

  iotHubKeys: Record<string, string>;

  jwt: string;

  resGroupLookup: string;
}

export const handler: Handlers<DataPageData | null, OpenBiotechManagerState> = {
  async GET(_, ctx) {
    if (ctx.state.Phase < 2) {
      return redirectRequest("/");
    }

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

    const resKeys = eacConnections.Clouds![ctx.state.Cloud.CloudLookup!]
      .ResourceGroups![ctx.state.Cloud.ResourceGroupLookup!].Resources![
        "iot-flow"
      ].Keys as Record<string, unknown>;

    const iotHubKeys = resKeys[
      `Microsoft.Devices/IotHubs/${ctx.state.Cloud
        .ResourceGroupLookup!}-iot-hub`
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

    const data: DataPageData = {
      apiBase: Deno.env.get("LOCAL_API_BASE")!,
      dataPhase: ctx.state.Data.Phase,
      deviceKeys: deviceKeys,
      iotHubKeys: iotHubKeys,
      jwt: ctx.state.Devices.JWT,
      resGroupLookup: ctx.state.Cloud.ResourceGroupLookup!,
    };

    return ctx.render(data);
  },
};

export default function Devices({
  data,
}: PageProps<DataPageData | null, OpenBiotechManagerState>) {
  return (
    <div>
      <Hero
        title="Data, APIs, and Dashboards"
        callToAction="Get eyes on your data, share with downstream analytics and ML services, all with turnkey dashboarding capabilities."
        class="[&_*]:mx-auto [&>*>*]:w-full bg-hero-pattern text-center"
        heroStyle={HeroStyleTypes.None}
        displayStyle={DisplayStyleTypes.Center | DisplayStyleTypes.Large}
      />

      <DataStepsFeatures
        apiBase={data!.apiBase}
        dataPhase={data!.dataPhase}
        deviceKeys={data!.deviceKeys}
        iotHubKeys={data!.iotHubKeys}
        jwt={data!.jwt}
        resGroupLookup={data!.resGroupLookup}
      />
    </div>
  );
}
