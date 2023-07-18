import { PageProps } from "$fresh/server.ts";
import { Action, ActionStyleTypes } from "$atomic/atoms/Action.tsx";
import { ActionGroup } from "$atomic/molecules/ActionGroup.tsx";
import { DisplayStyleTypes } from "$atomic/molecules/Display.tsx";
import { Hero, HeroStyleTypes } from "$atomic/organisms/Hero.tsx";

export default function CloudCALZ(props: PageProps) {
  return (
    <>
      <Hero
        title="Composable Application Landing Zone (CALZ)"
        callToAction="The Fathym CALZ is an enterprise ready cloud landing zone that enables rapid application delivery to scalable, secure infrastructure."
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
              Resource Group Name
            </label>

            <input
              id="resource-group-name"
              name="resource-group-name"
              type="text"
              required
              placeholder="Enter new resource group name"
              class="appearance-none block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded leading-tight focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <ActionGroup class="my-8 flex-col-reverse md:flex-row">
          <>
            <span class="flex-auto"></span>

            <Action
              type="submit"
              class="w-full md:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold m-1 py-2 px-4 rounded focus:outline-none shadow-lg"
            >
              Create CALZ
            </Action>
          </>
        </ActionGroup>
      </form>
    </>
  );
}
