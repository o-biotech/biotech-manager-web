import { JSX } from "preact";
import { Action, ActionGroup, classSet } from "@fathym/atomic";
import { callToActionStyles } from "../../styles/actions.tsx";

export default function CloudIoTForm(
  props: JSX.HTMLAttributes<HTMLFormElement>,
) {
  return (
    <form
      {...props}
      class={classSet(props, "w-full max-w-sm md:max-w-md mx-auto p-3 mt-8")}
    >
      <div class="flex flex-wrap -mx-3 mb-4">
        <div class="w-full px-3">
          <label
            for="subscription-name"
            class="block uppercase tracking-wide font-bold mb-2 text-xl"
          >
            IoT infrastructure not configured
          </label>

          {
            /* <p>
            Configure your IoT infrastructure to get started with device data
            flows and APIs.
          </p> */
          }
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
