import { Handlers, PageProps } from "$fresh/server.ts";
import { Action } from "$atomic/atoms/Action.tsx";
import { DisplayStyleTypes } from "$atomic/molecules/Display.tsx";
import { Hero, HeroProps, HeroStyleTypes } from "$atomic/organisms/Hero.tsx";
import { ChevronRightIcon } from "$atomic/atoms/icons/ChevronRightIcon.tsx";
import { IconStyleTypes } from "$atomic/atoms/icons/Icon.tsx";

export default function CreateApplicationsHero(props: HeroProps) {
  return (
    <Hero
      title="Create Applications"
      callToAction="You don't have any applications for displaying your device data, let's deploy one now."
      class="[&_*]:mx-auto [&>*>*]:w-full bg-hero-pattern text-center"
      heroStyle={HeroStyleTypes.None}
      displayStyle={DisplayStyleTypes.Center | DisplayStyleTypes.Large}
      {...props}
    >
      <Action href="/applications" class="my-8 flex flex-row">
        Create App
        <ChevronRightIcon iconStyle={IconStyleTypes.Outline} />
      </Action>
    </Hero>
  );
}
