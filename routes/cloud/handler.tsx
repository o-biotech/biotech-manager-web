import { Handlers } from "$fresh/server.ts";
import { redirectRequest } from "@fathym/common";
import { OpenBiotechManagerState } from "../../src/OpenBiotechManagerState.tsx";
import { eacAzureSvc } from "../../services/eac.ts";
import { CloudPageData } from "./index.tsx";

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
          "https://raw.githubusercontent.com/lowcodeunit/infrastructure/master/templates/azure/iot/ref-arch/warm/services.jsonc",
        ];

        const svcFileCalls = serviceFiles.map(async (sf) => {
          const resp = await fetch(sf);

          return await resp.json();
        });

        const svcDefs = await Promise.all<EaCServiceDefinition>(svcFileCalls);

        const locationsResp = await eacAzureSvc.CloudLocations(
          ctx.state.EaC.EnterpriseLookup!,
          data.cloudLookup!,
          {
            "Microsoft.Devices": {
              Types: ["IotHubs"],
            },
            "Microsoft.Resources": {
              Types: ["deployments", "resourceGroups"],
            },
            "Microsoft.Security": {
              Types: ["iotSecuritySolutions"],
            },
            "Microsoft.Kusto": {
              Types: [
                "clusters",
                "clusters/databases",
                "clusters/databases/principalassignments",
              ],
            },
          },
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
