import { Handlers, PageProps } from "$fresh/server.ts";
import { Action } from "$atomic/atoms/Action.tsx";
import { DisplayStyleTypes } from "$atomic/molecules/Display.tsx";
import { Hero, HeroProps, HeroStyleTypes } from "$atomic/organisms/Hero.tsx";
import { ChevronRightIcon } from "$atomic/atoms/icons/ChevronRightIcon.tsx";
import { IconStyleTypes } from "$atomic/atoms/icons/Icon.tsx";

export interface CloudConnectHeroProps extends HeroProps {
  hideAction?: boolean;
}

export default function CloudConnectHero(props: CloudConnectHeroProps) {
  return (
    <Hero
      title="Connect to Cloud"
      callToAction="You have not setup your Azure cloud connection, let's get started now."
      class="[&_*]:mx-auto [&>*>*]:w-full bg-hero-pattern text-center"
      heroStyle={HeroStyleTypes.None}
      displayStyle={DisplayStyleTypes.Center | DisplayStyleTypes.Large}
      {...props}
    >
      {!props.hideAction && (
        <Action href="./cloud" class="my-8 flex flex-row">
          Connect Now
          <ChevronRightIcon iconStyle={IconStyleTypes.Outline} />
        </Action>
      )}
    </Hero>
  );
}
