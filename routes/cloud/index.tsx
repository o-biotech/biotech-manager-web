// deno-lint-ignore-file no-explicit-any
import { Handlers, PageProps } from "$fresh/server.ts";
import * as ArmResource from "npm:@azure/arm-subscriptions";
import { AccessToken } from "npm:@azure/identity";
import CloudConnectHero from "../../components/organisms/heros/CloudConnectHero.tsx";
import CloudStepsFeatures from "../../components/organisms/cloud/CloudStepsFeatures.tsx";
import { CloudPhaseTypes } from "../../src/CloudPhaseTypes.tsx";
import { OpenBiotechManagerState } from "../../src/OpenBiotechManagerState.tsx";
import { redirectRequest } from "../../src/utils/request.helpers.ts";
import { msalAuthProvider } from "../../configs/msal.config.ts";

interface CloudPageData {
  cloudPhase: CloudPhaseTypes;

  isConnected: boolean;

  subs: ArmResource.Subscription[];
}

export const handler: Handlers<CloudPageData | null, OpenBiotechManagerState> =
  {
    async GET(_, ctx) {
      // const {} = ctx.params;

      // const resp = await fetch(`https://api.github.com/users/${username}`);
      // if (resp.status === 404) {
      //   return ctx.render(null);
      // }

      // ctx.state.session.set("isMsalAuthenticated", false);

      const test = ctx.state.session.get("test");

      const data: CloudPageData = {
        cloudPhase: ctx.state.Cloud.Phase,
        isConnected: ctx.state.Cloud.IsConnected,
        subs: [],
      };

      if (data.isConnected) {
        const subClient = new ArmResource.SubscriptionClient({
          getToken: async () => {
            const token = await msalAuthProvider.GetAccessToken(
              ctx.state.session,
            );

            return {
              token,
            } as AccessToken;
          },
        });

        const subsList = subClient.subscriptions.list();

        for await (const sub of subsList) {
          data!.subs.push(sub);
          console.log(sub)
        }
        // .then((subs) => {
        // });
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
        cloudPhase={data!.cloudPhase}
        isConnected={data!.isConnected}
        subs={data!.subs}
      />
    </div>
  );
}
