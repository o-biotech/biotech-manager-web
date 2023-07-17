import { Handlers, PageProps } from "$fresh/server.ts";
import { Action } from "$atomic/atoms/Action.tsx";
import { DisplayStyleTypes } from "$atomic/molecules/Display.tsx";
import { Hero, HeroProps, HeroStyleTypes } from "$atomic/organisms/Hero.tsx";
import { ChevronRightIcon } from "$atomic/atoms/icons/ChevronRightIcon.tsx";
import { IconStyleTypes } from "$atomic/atoms/icons/Icon.tsx";

export default function CloudConnectHero(props: HeroProps) {
  return (
    <Hero
      title="Connect to Cloud"
      callToAction="You have not setup your Azure cloud connection, let's get started now."
      class="[&_*]:mx-auto [&>*>*]:w-full bg-hero-pattern text-center"
      heroStyle={HeroStyleTypes.None}
      displayStyle={DisplayStyleTypes.Center | DisplayStyleTypes.Large}
      {...props}
    >
      <Action href="./cloud/connect" class="my-8 flex flex-row">
        Connect Now
        <ChevronRightIcon iconStyle={IconStyleTypes.Outline} />
      </Action>
    </Hero>
  );
}
