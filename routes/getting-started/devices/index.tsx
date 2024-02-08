import { Handlers, PageProps } from "$fresh/server.ts";
import { DisplayStyleTypes, Hero, HeroStyleTypes } from "@fathym/atomic";
import { DevicesPhaseTypes } from "../../../src/DevicesPhaseTypes.tsx";
import { DevicesStepsFeatures } from "../../../components/organisms/features/DevicesStepsFeatures.tsx";
import { OpenBiotechManagerState } from "../../../src/OpenBiotechManagerState.tsx";
import { redirectRequest } from "@fathym/common";

interface DevicesPageData {
  cloudLookup: string;

  devicesPhase: DevicesPhaseTypes;

  iotLookup: string;

  jwt: string;

  resGroupLookup: string;
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
      cloudLookup: ctx.state.Cloud.CloudLookup!,
      devicesPhase: ctx.state.Devices.Phase,
      iotLookup: ctx.state.Devices.IoTLookup!,
      jwt: ctx.state.Devices.JWT!,
      resGroupLookup: ctx.state.Cloud.ResourceGroupLookup!,
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
        title="Device Configuration"
        callToAction="Register a device and select dashboard services."
        class="[&_*]:mx-auto [&>*>*]:w-full bg-hero-pattern text-center"
        heroStyle={HeroStyleTypes.None}
        displayStyle={DisplayStyleTypes.Center | DisplayStyleTypes.Large}
      />

      <DevicesStepsFeatures
        cloudLookup={data!.cloudLookup}
        iotLookup={data!.iotLookup}
        jwt={data!.jwt}
        resGroupLookup={data!.resGroupLookup}
        devicesPhase={data!.devicesPhase}
      />
    </div>
  );
}
