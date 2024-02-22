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
      callToAction="Let's continue by setting up your first device flow."
      class="[&_*]:mx-auto [&>*>*]:w-full bg-[#000028] text-center"
      heroStyle={HeroStyleTypes.None}
      displayStyle={DisplayStyleTypes.Center | DisplayStyleTypes.Large}
      {...props}
    >
      {
        /* {!props.hideAction && (
        <Action
          href="/getting-started/devices"
          class="my-8 flex flex-row"
        >
          Create Device Flow
          <ChevronRightIcon class="w-[24px] h-[24px]" />
        </Action>
      )} */
      }
    </Hero>
  );
}
