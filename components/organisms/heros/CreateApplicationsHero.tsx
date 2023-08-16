import { Handlers, PageProps } from "$fresh/server.ts";
import {
  Action,
  DisplayStyleTypes,
  Hero,
  HeroProps,
  HeroStyleTypes,
} from "@fathym/atomic";
import { ChevronRightIcon } from "$fathym/atomic-icons";

export interface CreateApplicationsHeroProps extends HeroProps {
  hideAction?: boolean;
}

export default function CreateApplicationsHero(
  props: CreateApplicationsHeroProps,
) {
  return (
    <Hero
      title="Create Applications"
      callToAction="You don't have any applications for displaying your device data, let's deploy one now."
      class="[&_*]:mx-auto [&>*>*]:w-full bg-hero-pattern text-center"
      heroStyle={HeroStyleTypes.None}
      displayStyle={DisplayStyleTypes.Center | DisplayStyleTypes.Large}
      {...props}
    >
      {!props.hideAction && (
        <Action href="/applications" class="my-8 flex flex-row">
          Create App
          <ChevronRightIcon class="w-[24px] h-[24px]" />
        </Action>
      )}
    </Hero>
  );
}
