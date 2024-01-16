import { JSX } from "preact";
import { Action, ActionGroup, classSet, Input } from "@fathym/atomic";
import { Location } from "npm:@azure/arm-subscriptions";
import { callToActionStyles } from "../../styles/actions.tsx";
import { HotFlowInput } from "../../../islands/organisms/cloud/iot/hot-flow-input.tsx";

export type CloudIoTFormProps = JSX.HTMLAttributes<HTMLFormElement> & {
  cloudLookup: string;

  hasGitHubAuth: boolean;

  organizations?: string[];

  resGroupLookup: string;

  resLookup?: string;
};

export default function CloudIoTForm(props: CloudIoTFormProps) {
  return (
    <form
      method="post"
      action="/api/eac/clouds/iot-infrastructure"
      {...props}
      class={classSet(props, "w-full max-w-sm md:max-w-md mx-auto p-3 mt-8")}
    >
      <div class="flex flex-wrap -mx-3 mb-4 text-left">
        <Input
          id="cloudLookup"
          name="cloudLookup"
          type="hidden"
          value={props.cloudLookup}
        />

        <Input
          id="resGroupLookup"
          name="resGroupLookup"
          type="hidden"
          value={props.resGroupLookup}
        />

        <Input
          id="resLookup"
          name="resLookup"
          type="hidden"
          value={props.resLookup}
        />

        <div class="w-full p-3">
          <label class="block uppercase tracking-wide font-bold mb-2 text-xl">
            Storage Flows
          </label>

          <p class="block text-md mb-8">
            Your storage flows determine how your data can be accessed. Cold
            flows allow for long term storage with slower querying performance.
            Warm flows allow for shorter term storage with better querying
            performance. Hot flows provide data immediately with no storage; you
            manage the storage.
          </p>

          <div class="flex items-center mb-2">
            <Input
              id="storageFlowCold"
              name="storageFlowCold"
              type="checkbox"
              value="cold"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />

            <label for="storageFlowCold" class="ms-2 text-sm font-medium pl-3">
              Cold Storage
            </label>
          </div>

          <div class="flex items-center mb-2">
            <Input
              id="storageFlowWarm"
              name="storageFlowWarm"
              type="checkbox"
              value="warm"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />

            <label for="storageFlowWarm" class="ms-2 text-sm font-medium pl-3">
              Warm Storage
            </label>
          </div>

          <div class="flex items-center mb-2">
            <HotFlowInput
              id="storageFlowHot"
              name="storageFlowHot"
              value="hot"
              hasGitHubAuth={props.hasGitHubAuth}
              organizations={props.organizations}
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            >
              <label for="storageFlowHot" class="ms-2 text-sm font-medium pl-3">
                Hot Storage
              </label>
            </HotFlowInput>
          </div>
        </div>
      </div>

      <ActionGroup class="mt-8 flex-col">
        <>
          <Action
            type="submit"
            class={classSet(
              callToActionStyles.props,
              "w-full md:w-auto text-white font-bold m-1 py-2 px-4 rounded focus:outline-none shadow-lg",
            )}
          >
            Establish IoT Infrastructure
          </Action>
        </>
      </ActionGroup>
    </form>
  );
}
