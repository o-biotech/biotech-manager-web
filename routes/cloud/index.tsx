import { Handlers, PageProps } from "$fresh/server.ts";
import { Location, Subscription } from "npm:@azure/arm-subscriptions";
import { mergeWithArrays, redirectRequest } from "@fathym/common";
import { EaCServiceDefinitions } from "@fathym/eac";
import CloudConnectHero from "../../components/organisms/heros/CloudConnectHero.tsx";
import CloudStepsFeatures from "../../components/organisms/cloud/CloudStepsFeatures.tsx";
import { CloudPhaseTypes } from "../../src/CloudPhaseTypes.tsx";
import { OpenBiotechManagerState } from "../../src/OpenBiotechManagerState.tsx";
import { msalAuthProvider } from "../../configs/msal.config.ts";
import { OpenBiotechEaC } from "../../src/eac/OpenBiotechEaC.ts";
import { loadEaCAzureSvc, loadEaCSvc } from "../../configs/eac.ts";

interface CloudPageData {
  cloudLookup?: string;

  cloudPhase: CloudPhaseTypes;

  hasGitHubAuth: boolean;

  isConnected: boolean;

  locations: Location[];

  organizations?: string[];

  resGroupLookup?: string;

  subs: Subscription[];
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
        hasGitHubAuth: !!ctx.state.GitHub,
        isConnected: ctx.state.Cloud.IsConnected,
        resGroupLookup: ctx.state.Cloud.ResourceGroupLookup,
        locations: [],
        subs: [],
      };

      const svcCalls: (() => Promise<void>)[] = [];

      if (data.cloudLookup) {
        const serviceFiles = [
          "https://raw.githubusercontent.com/lowcodeunit/infrastructure/master/templates/o-biotech/iot/ref-arch/services.jsonc",
          "https://raw.githubusercontent.com/lowcodeunit/infrastructure/master/templates/o-biotech/iot/ref-arch/api/services.jsonc",
          "https://raw.githubusercontent.com/lowcodeunit/infrastructure/master/templates/o-biotech/iot/ref-arch/cold/services.jsonc",
          "https://raw.githubusercontent.com/lowcodeunit/infrastructure/master/templates/o-biotech/iot/ref-arch/hot/services.jsonc",
          "https://raw.githubusercontent.com/lowcodeunit/infrastructure/master/templates/o-biotech/iot/ref-arch/warm/services.jsonc",
        ];

        const svcFileCalls: Promise<EaCServiceDefinitions>[] = serviceFiles.map(
          (sf) => {
            return new Promise((resolve, reject) => {
              fetch(sf).then((fileResp) => {
                fileResp.json().then((response) => {
                  resolve(response);
                });
              });
            });
          },
        );

        svcCalls.push(async () => {
          const svcDefs = await Promise.all<EaCServiceDefinitions>(
            svcFileCalls,
          );

          const svcDef = mergeWithArrays<EaCServiceDefinitions>(...svcDefs);

          const eacAzureSvc = await loadEaCAzureSvc(ctx.state.EaCJWT!);

          const locationsResp = await eacAzureSvc.CloudLocations(
            ctx.state.EaC!.EnterpriseLookup!,
            data.cloudLookup!,
            svcDef,
          );

          await eacAzureSvc.CloudEnsureProviders(
            ctx.state.EaC!.EnterpriseLookup!,
            data.cloudLookup!,
            svcDef,
          );

          data.locations = locationsResp.Locations;
        });
      }

      if (ctx.state.GitHub) {
        svcCalls.push(async () => {
          const sourceKey = `GITHUB://${ctx.state.GitHub!.Username}`;

          const eacSvc = await loadEaCSvc(ctx.state.EaCJWT!);

          const eacConnections = await eacSvc.Connections<OpenBiotechEaC>({
            EnterpriseLookup: ctx.state.EaC!.EnterpriseLookup!,
            SourceConnections: {
              [sourceKey]: {},
            },
          });

          if (eacConnections.SourceConnections) {
            data.organizations = Object.keys(
              eacConnections.SourceConnections[sourceKey].Organizations || {},
            );
          }
        });
      }

      await await Promise.all(
        svcCalls.map(async (sc) => {
          await sc();
        }),
      );

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
        hasGitHubAuth={data!.hasGitHubAuth}
        organizations={data!.organizations}
        resGroupLookup={data!.resGroupLookup}
        subs={data!.subs}
      />
    </div>
  );
}
