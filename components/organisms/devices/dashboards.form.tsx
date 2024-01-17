import { JSX } from "preact";
import { Action, ActionGroup, classSet, Input } from "@fathym/atomic";
import { Location } from "npm:@azure/arm-subscriptions";
import { callToActionStyles } from "../../styles/actions.tsx";

export type DevicesDashboardFormProps = JSX.HTMLAttributes<HTMLFormElement> & {
  iotLookup: string;
};

export default function DevicesDashboardForm(props: DevicesDashboardFormProps) {
  return (
    <form
      method="post"
      action="/api/eac/iot/dashboards"
      {...props}
      class={classSet(props, "w-full max-w-sm md:max-w-md mx-auto p-3 mt-8")}
    >
      <div class="flex flex-wrap -mx-3 mb-4 text-left">
        <Input
          id="iotLookup"
          name="iotLookup"
          type="hidden"
          value={props.iotLookup}
        />

        <div class="w-full p-3">
          <label class="block uppercase tracking-wide font-bold mb-2 text-xl">
            Data Dashboards
          </label>

          <p class="block text-md mb-8">
            Configuring default data dashboards will help you get started
            quickly visualizing your data so you know what it is and can
            brainstorm what to do with it.
          </p>

          <div class="flex items-center mb-2">
            <Input
              type="checkbox"
              checked
              disabled
              value="dataExplorer"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />

            <Input
              type="hidden"
              id="dataExplorer"
              name="dataExplorer"
              value="dataExplorer"
            />

            <label for="dataExplorer" class="ms-2 text-sm font-medium pl-3">
              Azure Data Explorer (required)
            </label>
          </div>

          {
            /* <div class="flex items-center mb-2">
            <Input
              id="fathymDataDashboard"
              name="fathymDataDashboard"
              type="checkbox"
              value="fathymDataDashboard"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="fathymDataDashboard"
              class="ms-2 text-sm font-medium pl-3"
            >
              Fathym Data Dashboard
            </label>
          </div> */
          }

          <div class="flex items-center mb-2">
            <Input
              id="freeboard"
              name="freeboard"
              type="checkbox"
              value="freeboard"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label for="freeboard" class="ms-2 text-sm font-medium pl-3">
              Freeboard
            </label>
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
            Establish Dashboards
          </Action>
        </>
      </ActionGroup>
    </form>
  );
}
