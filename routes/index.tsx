import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";
import { DisplayProps, DisplayStyleTypes } from "$atomic/molecules/Display.tsx";
import { Features } from "$atomic/organisms/Features.tsx";
import { Hero, HeroStyleTypes } from "$atomic/organisms/Hero.tsx";
import { Action, ActionStyleTypes } from "$atomic/atoms/Action.tsx";
import { ChevronRightIcon } from "$atomic/atoms/icons/ChevronRightIcon.tsx";
import { IconStyleTypes } from "$atomic/atoms/icons/Icon.tsx";
import { ComponentChildren } from "preact";

export default function Home() {
  const count = useSignal(3);

  const buildTitle = (
    step: number,
    title: ComponentChildren,
  ): ComponentChildren => {
    return (
      <h1 class="text-2xl font-bold md:text-3xl inline-block my-4 bg-gradient-to-br from-blue-500 to-purple-500/75 bg-clip-text text-transparent">
        <span class="rounded-full px-4 py-1 border(solid 1) m-2 shadow-lg text-white bg-gradient-to-tr from-blue-500 to-purple-500/75">
          {step}
        </span>

        {title}
      </h1>
    );
  };

  const currentHero = {
    title: "Get Started Now",
    callToAction:
      "You don't have any device flows created, let's get your first one setup.",
    children: (
      <Action href="/devices/flows" class="my-8 flex flex-row">
        Create Device Flow{" "}
        <ChevronRightIcon iconStyle={IconStyleTypes.Outline} />
      </Action>
    ),
  };

  return (
    <>
      <Hero
        {...currentHero}
        class="[&_*]:mx-auto [&>*>*]:w-full bg-hero-pattern text-center"
        heroStyle={HeroStyleTypes.None}
        displayStyle={DisplayStyleTypes.Center | DisplayStyleTypes.Large}
      />

      <Features
        class="m-8"
        callToAction={
          <div class="flex justify-center">
            <Action
              href="./cloud-connect"
              class="mx-4 md:m-8 text-2xl text-center shadow-lg mx-auto max-w-[60%] w-full bg-gradient-to-r from-blue-500 to-purple-500/75 hover:(bg-gradient-to-r from-purple-500 to-blue-500/75)"
            >
              <ChevronRightIcon
                iconStyle={IconStyleTypes.Outline}
                class="float-right pt-2"
              />

              Start Connecting Now
            </Action>
          </div>
        }
      >
        {[{
          title: buildTitle(1, "Connect to Cloud"),
          class: "shadow-lg p-4 m-4",
          displayStyle: DisplayStyleTypes.Center,
          children: (
            <p class="m-2">
              Bring your own Azure Cloud connection or get started with a Fathym
              Managed Azure Subscription.
            </p>
          ),
        }, {
          title: buildTitle(2, "Connect Devices"),
          class: "shadow-lg p-4 m-4",
          displayStyle: DisplayStyleTypes.Center,
          children: (
            <p class="m-2">
              Deploy your first device data flow and connect (or emulate) your
              first devices.
            </p>
          ),
        }, {
          title: buildTitle(3, "Create Applications"),
          class: "shadow-lg p-4 m-4",
          displayStyle: DisplayStyleTypes.Center,
          children: (
            <p class="m-2">
              Easily develop and securely share your data for collaboration and
              consumer products.
            </p>
          ),
        }]}
      </Features>
    </>
  );
}
