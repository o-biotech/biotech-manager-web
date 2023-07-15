import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";
import { DisplayProps, DisplayStyleTypes } from "$atomic/molecules/Display.tsx";
import { Features } from "$atomic/organisms/Features.tsx";
import { Hero, HeroStyleTypes } from "$atomic/organisms/Hero.tsx";
import { Action, ActionStyleTypes } from "$atomic/atoms/Action.tsx";

export default function Home() {
  const count = useSignal(3);
  return (
    <>
      <Hero
        class="[&_*]:mx-auto [&>*>*]:w-full bg-hero-pattern text-center"
        title="Get Started Now"
        callToAction="You don't have any device flows created, let's get your first one setup."
        heroStyle={HeroStyleTypes.None}
        displayStyle={DisplayStyleTypes.Center | DisplayStyleTypes.Large}
      >
        <Action href="/devices/flows" class="my-8">
          Create Device Flow >
        </Action>
      </Hero>

      <Features class="my-8 [&>*]:(shadow-lg p-4 m-4)">
        {[{
          title: "Start with Fathym CLI",
          displayStyle: DisplayStyleTypes.Center,
          children: (
            <>
              <p class="m-2">
                Use the Fathym CLI to get your device data flowing.
              </p>

              <Action
                href="/docs/cli/getting-started"
                class="m-4 md:m-8"
                actionStyle={ActionStyleTypes.Link | ActionStyleTypes.Outline |
                  ActionStyleTypes.Rounded}
              >
                Start with CLI
              </Action>
            </>
          ),
        }, {
          title: "Start with Fathym UI",
          displayStyle: DisplayStyleTypes.Center,
          children: (
            <>
              <p class="m-2">
                Use the Fathym UI to get your device data flowing.
              </p>

              <Action
                href="/dashboard"
                class="m-4 md:m-8"
                actionStyle={ActionStyleTypes.Link | ActionStyleTypes.Outline |
                  ActionStyleTypes.Rounded}
              >
                Start with Dashboard
              </Action>
            </>
          ),
        }, {
          title: "Start with Thinky AI",
          displayStyle: DisplayStyleTypes.Center,
          children: (
            <>
              <p class="m-2">Use Thinky to get your device data flowing.</p>

              <Action
                href="/dashboard/thinky"
                class="m-4 md:m-8"
                actionStyle={ActionStyleTypes.Link | ActionStyleTypes.Outline |
                  ActionStyleTypes.Rounded}
              >
                Start with Thinky
              </Action>
            </>
          ),
        }]}
      </Features>
    </>
  );
}
