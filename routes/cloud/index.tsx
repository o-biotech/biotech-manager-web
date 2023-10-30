import { Handlers, PageProps } from "$fresh/server.ts";
import CloudConnectHero from "../../components/organisms/heros/CloudConnectHero.tsx";
import CloudStepsFeatures from "../../components/organisms/cloud/CloudStepsFeatures.tsx";
import { CloudPhaseTypes } from "../../src/CloudPhaseTypes.tsx";
import { OpenBiotechManagerState } from "../../src/OpenBiotechManagerState.tsx";
import { redirectRequest } from "../../src/utils/request.helpers.ts";

interface CloudPageData {
  cloudPhase: CloudPhaseTypes;

  isConnected: boolean;
}

export const handler: Handlers<CloudPageData | null, OpenBiotechManagerState> =
  {
    GET(_, ctx) {
      // const {} = ctx.params;

      // const resp = await fetch(`https://api.github.com/users/${username}`);
      // if (resp.status === 404) {
      //   return ctx.render(null);
      // }

      // ctx.state.session.set("isAuthenticated", false);

      const data: CloudPageData = {
        cloudPhase: ctx.state.Cloud.Phase,
        isConnected: ctx.state.Cloud.IsConnected,
      };

      return ctx.render(data);
    },
    POST(_req, ctx) {
      ctx.state.session.set("isAuthenticated", true);

      return redirectRequest("/cloud");
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
      />
    </div>
  );
}
