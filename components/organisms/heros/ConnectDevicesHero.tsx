import { Handlers, PageProps } from "$fresh/server.ts";
import { Action } from "$atomic/atoms/Action.tsx";
import { DisplayStyleTypes } from "$atomic/molecules/Display.tsx";
import { Hero, HeroProps, HeroStyleTypes } from "$atomic/organisms/Hero.tsx";
import { ChevronRightIcon } from "$atomic/atoms/icons/ChevronRightIcon.tsx";
import { IconStyleTypes } from "$atomic/atoms/icons/Icon.tsx";

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
        <Action href="/devices/flows" class="my-8 flex flex-row">
          Create Device Flow
          <ChevronRightIcon iconStyle={IconStyleTypes.Outline} />
        </Action>
      )}
    </Hero>
  );
}
