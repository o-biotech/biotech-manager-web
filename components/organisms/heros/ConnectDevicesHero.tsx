import { Handlers, PageProps } from "$fresh/server.ts";
import {
  Action,
  DisplayStyleTypes,
  Hero,
  HeroProps,
  HeroStyleTypes,
} from "@fathym/atomic";
import { ChevronRightIcon } from "$fathym/atomic-icons";

export interface ConnectDevicesHeroProps extends HeroProps {
  hideAction?: boolean;
}

export default function ConnectDevicesHero(props: ConnectDevicesHeroProps) {
  return (
    <Hero
      title="Connect Devices"
      callToAction="You don't have any device flows created, let's get your first one setup."
      class="[&_*]:mx-auto [&>*>*]:w-full bg-hero-pattern text-center"
      heroStyle={HeroStyleTypes.None}
      displayStyle={DisplayStyleTypes.Center | DisplayStyleTypes.Large}
      {...props}
    >
      {!props.hideAction && (
        <Action
          href="/getting-started/devices/flows"
          class="my-8 flex flex-row"
        >
          Create Device Flow
          <ChevronRightIcon class="w-[24px] h-[24px]" />
        </Action>
      )}
    </Hero>
  );
}
