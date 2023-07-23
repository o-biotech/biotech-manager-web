import { Handlers, PageProps } from "$fresh/server.ts";
import CloudConnectHero from "../../components/organisms/heros/CloudConnectHero.tsx";
import CloudStepsFeatures from "../../components/organisms/cloud/CloudStepsFeatures.tsx";
import { CloudPhaseTypes } from "../../components/CloudPhaseTypes.tsx";

interface CloudPageData {
  cloudPhase: CloudPhaseTypes;
}

export const handler: Handlers<CloudPageData | null> = {
  GET(_, ctx) {
    // const {} = ctx.params;

    // const resp = await fetch(`https://api.github.com/users/${username}`);
    // if (resp.status === 404) {
    //   return ctx.render(null);
    // }

    const data: CloudPageData = {
      cloudPhase: CloudPhaseTypes.Connect,
    };

    return ctx.render(data);
  },
};

export default function Cloud({ data }: PageProps<CloudPageData | null>) {
  return (
    <div>
      <CloudConnectHero hideAction />

      <CloudStepsFeatures cloudPhase={data!.cloudPhase} />
    </div>
  );
}
