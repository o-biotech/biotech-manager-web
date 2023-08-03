import { JSX } from "preact";
import { Action, ActionStyleTypes } from "$atomic/atoms/Action.tsx";
import { ActionGroup } from "$atomic/molecules/ActionGroup.tsx";
import { classSet } from "$atomic/utils/jsx.tsx";
import { callToActionStyles } from "../../../styles/actions.tsx";

export interface CloudConnectExistingFormProps
  extends JSX.HTMLAttributes<HTMLFormElement> {
  subscriptions?: { [key: string]: string };
}

export default function CloudConnectExistingForm(
  props: CloudConnectExistingFormProps,
) {
  return (
    <form
      {...props}
      class={classSet(props, "w-full max-w-sm md:max-w-md mx-auto py-3 mt-8")}
    >
      <div class="flex flex-wrap -mx-3 mb-4">
        <div class="w-full px-3">
          <label
            for="subscription-name"
            class="block uppercase tracking-wide font-bold mb-2 text-xl"
          >
            Existing Subscription
          </label>

          <select
            id="subscription-plan"
            name="subscription-plan"
            required
            class="appearance-none block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:shadow-lg focus:border-blue-500 placeholder-gray-500"
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

      <ActionGroup class="mt-8 flex-col">
        <>
          <Action
            type="submit"
            class={classSet(
              callToActionStyles.props,
              "w-full md:w-auto text-white font-bold m-1 py-2 px-4 rounded focus:outline-none shadow-lg",
            )}
          >
            Connect Subscription
          </Action>
        </>
      </ActionGroup>
    </form>
  );
}