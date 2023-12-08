import { JSX } from "preact";
import { Action, ActionGroup, classSet, Input } from "@fathym/atomic";
import { callToActionStyles } from "../../styles/actions.tsx";

export type DataExploreFormProps = JSX.HTMLAttributes<HTMLFormElement>;

export function DataExploreForm(props: DataExploreFormProps) {
  return (
    <form
      method="post"
      action="/api/eac/data/explore"
      {...props}
      class={classSet(props, "w-full max-w-sm md:max-w-md mx-auto p-3 mt-8")}
    >
      <div class="flex flex-wrap -mx-3 mb-4 text-left">
        <div class="w-full p-3">
          <label class="block uppercase tracking-wide font-bold mb-2 text-xl">
            Explore Data
          </label>

          <p class="block text-md mb-8">
            Now that data is flowing, the next step is to explore the dashboards
            you configured previously, or skip ahead to see what other
            development you can implement with your data.
          </p>

          <div class="flex items-center mb-2">
            <Input
              id="dataExplorer"
              name="dataExplorer"
              type="checkbox"
              value="dataExplorer"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label for="dataExplorer" class="ms-2 text-sm font-medium pl-3">
              Azure Data Explorer
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
