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
      title="Set Up Data"
      callToAction="Flow real or simulated device data to the cloud and access it through data dashboards and APIs."
      class="[&_*]:mx-auto [&>*>*]:w-full bg-hero-pattern text-center"
      heroStyle={HeroStyleTypes.None}
      displayStyle={DisplayStyleTypes.Center | DisplayStyleTypes.Large}
      {...props}
    >
      {
        /* {!props.hideAction && (
        <Action
          href="/getting-started/data"
          class="my-8 flex flex-row"
        >
          Set Up Data Flow
          <ChevronRightIcon class="w-[24px] h-[24px]" />
        </Action>
      )} */
      }
    </Hero>
  );
}
