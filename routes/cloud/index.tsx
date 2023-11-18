// deno-lint-ignore-file no-explicit-any
import { Handlers, PageProps } from "$fresh/server.ts";
import * as ArmSubscriptions from "npm:@azure/arm-subscriptions";
import { mergeWithArrays, redirectRequest } from "@fathym/common";
import { EaCServiceDefinitions } from "@fathym/eac";
import CloudConnectHero from "../../components/organisms/heros/CloudConnectHero.tsx";
import CloudStepsFeatures from "../../components/organisms/cloud/CloudStepsFeatures.tsx";
import { CloudPhaseTypes } from "../../src/CloudPhaseTypes.tsx";
import { OpenBiotechManagerState } from "../../src/OpenBiotechManagerState.tsx";
import { msalAuthProvider } from "../../configs/msal.config.ts";
import { OpenBiotechEaC } from "../../src/eac/OpenBiotechEaC.ts";
import { EaCCloudAzureDetails } from "../../../../fathym-deno/everything-as-code/src/eac/modules/clouds/EaCCloudAzureDetails.ts";
import { eacAzureSvc } from "../../services/eac.ts";

interface CloudPageData {
  cloudLookup?: string;

  cloudPhase: CloudPhaseTypes;

  isConnected: boolean;

  locations: ArmSubscriptions.Location[];

  resGroupLookup?: string;

  subs: ArmSubscriptions.Subscription[];
}

export const handler: Handlers<CloudPageData | null, OpenBiotechManagerState> =
  {
    async GET(_, ctx) {
      if (!ctx.state.EaC) {
        return redirectRequest("/");
      }

      const data: CloudPageData = {
        cloudLookup: ctx.state.Cloud.CloudLookup,
        cloudPhase: ctx.state.Cloud.Phase,
        isConnected: ctx.state.Cloud.IsConnected,
        resGroupLookup: ctx.state.Cloud.ResourceGroupLookup,
        locations: [],
        subs: [],
      };

      if (data.cloudLookup) {
        const serviceFiles = [
          "https://raw.githubusercontent.com/lowcodeunit/infrastructure/master/templates/azure/iot/ref-arch/services.jsonc",
          "https://raw.githubusercontent.com/lowcodeunit/infrastructure/master/templates/azure/iot/ref-arch/cold/services.jsonc",
          // "https://raw.githubusercontent.com/lowcodeunit/infrastructure/master/templates/azure/iot/ref-arch/hot/services.jsonc",
          "https://raw.githubusercontent.com/lowcodeunit/infrastructure/master/templates/azure/iot/ref-arch/warm/services.jsonc",
        ];

        const svcFileCalls = serviceFiles.map(async (sf) => {
          const resp = await fetch(sf);

          // const text = await resp.text();

          // return JSON.parse(text);

          return await resp.json();
        });

        const svcDefs = await Promise.all<EaCServiceDefinitions>(svcFileCalls);

        const svcDef = mergeWithArrays<EaCServiceDefinitions>(...svcDefs);

        const locationsResp = await eacAzureSvc.CloudLocations(
          ctx.state.EaC.EnterpriseLookup!,
          data.cloudLookup!,
          svcDef,
        );

        data.locations = locationsResp.Locations;

        if (data.isConnected) {
          // const subClient = new ArmSubscriptions.SubscriptionClient(creds);
          // const subsList = subClient.subscriptions.list();
          // try {
          //   for await (const sub of subsList) {
          //     data!.subs.push(sub);
          //   }
          // } catch (err) {
          //   console.log(err);
          // }
          // .then((subs) => {
          // });
        }
      }

      return ctx.render(data);
    },
  };

export default function Cloud({
  data,
}: PageProps<CloudPageData | null, OpenBiotechManagerState>) {
  return (
    <div>
      <CloudConnectHero hideAction />

      <CloudStepsFeatures
        cloudLookup={data!.cloudLookup}
        cloudPhase={data!.cloudPhase}
        locations={data!.locations}
        resGroupLookup={data!.resGroupLookup}
        subs={data!.subs}
      />
    </div>
  );
}
