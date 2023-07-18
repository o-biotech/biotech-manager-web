import { PageProps } from "$fresh/server.ts";
import { Hero, HeroStyleTypes } from "$atomic/organisms/Hero.tsx";
import { Action, ActionStyleTypes } from "$atomic/atoms/Action.tsx";
import { ActionGroup } from "$atomic/molecules/ActionGroup.tsx";
import { DisplayStyleTypes } from "$atomic/molecules/Display.tsx";

export default function CloudConnectExisting(props: PageProps) {
  return (
    <>
      <Hero
        title="Connect Existing Azure Subscription"
        callToAction="Use an existing subscription from your own Azure tenant to unlock the power of Fathym."
        class="[&_*]:mx-auto [&>*>*]:w-full bg-hero-pattern text-center"
        heroStyle={HeroStyleTypes.None}
        displayStyle={DisplayStyleTypes.Center | DisplayStyleTypes.Large}
      />

      <form class="w-full max-w-sm md:max-w-md mx-auto p-3 mt-8">
        <div class="flex flex-wrap -mx-3 mb-4">
          <div class="w-full px-3">
            <label
              for="subscription-name"
              class="block uppercase tracking-wide font-bold mb-2 text-2xl"
            >
              Existing Subscription
            </label>

            <select
              id="subscription-plan"
              name="subscription-plan"
              required
              class="appearance-none block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-500 placeholder-gray-500"
            >
              <option value="">Select an existing subscription</option>

              <option value="00000000-0000-0000-0000-000000000000">
                Fathym
              </option>

              <option value="00000000-0000-0000-0000-000000000000">
                Fathym R&D
              </option>
            </select>
          </div>
        </div>

        <ActionGroup class="my-8 flex-col-reverse md:flex-row">
          <>
            <Action
              href="./managed"
              class=" m-1"
              actionStyle={ActionStyleTypes.Outline | ActionStyleTypes.Link |
                ActionStyleTypes.Rounded}
            >
              Create managed
            </Action>

            <span class="flex-auto"></span>

            <Action
              type="submit"
              class="w-full md:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold m-1 py-2 px-4 rounded focus:outline-none shadow-lg"
            >
              Connect Subscription
            </Action>
          </>
        </ActionGroup>
      </form>
    </>
  );
}
