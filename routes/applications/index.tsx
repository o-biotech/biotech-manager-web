import { Handlers, PageProps } from "$fresh/server.ts";
import { DisplayStyleTypes } from "$atomic/molecules/Display.tsx";
import { Hero, HeroStyleTypes } from "$atomic/organisms/Hero.tsx";
import ApplicationsStepsFeatures from "../../components/organisms/features/ApplicationsStepsFeatures.tsx";
import { ApplicationsPhaseTypes } from "../../components/ApplicationsPhaseTypes.tsx";

interface DevicesPageData {
  appsPhase: ApplicationsPhaseTypes;
}

export const handler: Handlers<DevicesPageData | null> = {
  GET(_, ctx) {
    // const {} = ctx.params;

    // const resp = await fetch(`https://api.github.com/users/${username}`);
    // if (resp.status === 404) {
    //   return ctx.render(null);
    // }

    const data: DevicesPageData = {
      appsPhase: ApplicationsPhaseTypes.GitHub,
    };

    return ctx.render(data);
  },
};

export default function Devices({ data }: PageProps<DevicesPageData | null>) {
  return (
    <div>
      <Hero
        title="Applications & Collaboration"
        callToAction="Develop applications to share data, collaborate with colleagues or develop complete consumer applications."
        class="[&_*]:mx-auto [&>*>*]:w-full bg-hero-pattern text-center"
        heroStyle={HeroStyleTypes.None}
        displayStyle={DisplayStyleTypes.Center | DisplayStyleTypes.Large}
      />

      <ApplicationsStepsFeatures appsPhase={data!.appsPhase} />
    </div>
  );
}
