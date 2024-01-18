import { Handlers, PageProps } from "$fresh/server.ts";
import {
  Action,
  DisplayStyleTypes,
  Hero,
  HeroProps,
  HeroStyleTypes,
} from "@fathym/atomic";
import { ChevronRightIcon } from "$fathym/atomic-icons";

export interface SetupDataHeroProps extends HeroProps {
  hideAction?: boolean;
}

export default function SetupDataHero(props: SetupDataHeroProps) {
  return (
    <Hero
      title="Setup Data"
      callToAction="Collect and consume your device data anywhere you need it."
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
          Setup Data Flow
          <ChevronRightIcon class="w-[24px] h-[24px]" />
        </Action>
      )}
    </Hero>
  );
}
