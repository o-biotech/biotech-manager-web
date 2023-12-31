import { JSX } from "preact";
import { Action, ActionGroup, classSet, Input } from "@fathym/atomic";
import { callToActionStyles } from "../../../styles/actions.tsx";

export default function CloudConnectManagedForm(
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
            New Subscription Name
          </label>

          <Input
            id="subscription-name"
            name="subscription-name"
            type="text"
            required
            placeholder="Enter new subscription name"
            class="appearance-none block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded leading-tight focus:outline-none focus:border-blue-500"
          />
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
            Create Subscription
          </Action>
        </>
      </ActionGroup>
    </form>
  );
}
