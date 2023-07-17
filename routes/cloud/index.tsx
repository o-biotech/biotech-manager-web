import { Handlers, PageProps } from "$fresh/server.ts";
import { Action } from "$atomic/atoms/Action.tsx";
import { DisplayStyleTypes } from "$atomic/molecules/Display.tsx";
import { Hero, HeroStyleTypes } from "$atomic/organisms/Hero.tsx";
import { ChevronRightIcon } from "$atomic/atoms/icons/ChevronRightIcon.tsx";
import { IconStyleTypes } from "$atomic/atoms/icons/Icon.tsx";
import CloudConnectHero from "../../components/organisms/heros/CloudConnectHero.tsx";
import CloudStepsFeatures from "../../components/organisms/features/CloudStepsFeatures.tsx";
import { CloudPhaseTypes } from "../../components/CloudPhaseTypes.tsx";

interface CloudPageData {
  cloudPhase: CloudPhaseTypes;
}

export const handler: Handlers<CloudPageData | null> = {
  async GET(_, ctx) {
    // const {} = ctx.params;

    // const resp = await fetch(`https://api.github.com/users/${username}`);
    // if (resp.status === 404) {
    //   return ctx.render(null);
    // }

    const data: CloudPageData = {
      cloudPhase: CloudPhaseTypes.Complete,
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
