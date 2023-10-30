import { Handlers, PageProps } from "$fresh/server.ts";
import { DisplayStyleTypes, Hero, HeroStyleTypes } from "@fathym/atomic";
import { DevicesPhaseTypes } from "../../src/DevicesPhaseTypes.tsx";
import { DevicesStepsFeatures } from "../../components/organisms/features/DevicesStepsFeatures.tsx";
import { OpenBiotechManagerState } from "../../src/OpenBiotechManagerState.tsx";
import { redirectRequest } from "../../src/utils/request.helpers.ts";

interface DevicesPageData {
  devicesPhase: DevicesPhaseTypes;
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

    if (ctx.state.Phase < 1) {
      return redirectRequest("/");
    }

    const data: DevicesPageData = {
      devicesPhase: DevicesPhaseTypes.Connect,
    };

    return ctx.render(data);
  },
};

export default function Devices(
  { data }: PageProps<DevicesPageData | null, OpenBiotechManagerState>,
) {
  return (
    <div>
      <Hero
        title="Devices & Data Flows"
        callToAction="Connect devices, define data flows and access your data."
        class="[&_*]:mx-auto [&>*>*]:w-full bg-hero-pattern text-center"
        heroStyle={HeroStyleTypes.None}
        displayStyle={DisplayStyleTypes.Center | DisplayStyleTypes.Large}
      />

      <DevicesStepsFeatures devicesPhase={data!.devicesPhase} />
    </div>
  );
}
