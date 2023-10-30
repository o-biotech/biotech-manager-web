import { Handlers, PageProps } from "$fresh/server.ts";
import { DisplayStyleTypes, Hero, HeroStyleTypes } from "@fathym/atomic";
import { ApplicationsStepsFeatures } from "../../components/organisms/features/ApplicationsStepsFeatures.tsx";
import { ApplicationsPhaseTypes } from "../../src/ApplicationsPhaseTypes.tsx";
import { OpenBiotechManagerState } from "../../src/OpenBiotechManagerState.tsx";
import { redirectRequest } from "../../src/utils/request.helpers.ts";

interface DevicesPageData {
  appsPhase: ApplicationsPhaseTypes;
}

export const handler: Handlers<
  DevicesPageData | null,
  OpenBiotechManagerState
> = {
  GET(_, ctx) {
    // const {} = ctx.params;

    // const resp = await fetch(`https://api.github.com/users/${username}`);
    // if (resp.status === 404) {
    //   return ctx.render(null);
    // }

    if (ctx.state.Phase < 3) {
      return redirectRequest("/");
    }

    const data: DevicesPageData = {
      appsPhase: ApplicationsPhaseTypes.GitHub,
    };

    return ctx.render(data);
  },
};

export default function Devices({
  data,
}: PageProps<DevicesPageData | null, OpenBiotechManagerState>) {
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
