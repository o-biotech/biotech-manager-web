import { JSX } from "preact";
import { Action, ActionGroup, classSet } from "@fathym/atomic";
import { callToActionStyles } from "../../../styles/actions.tsx";

export interface CloudConnectAzureFormProps
  extends JSX.HTMLAttributes<HTMLFormElement> {}

export default function CloudConnectAzureForm(
  props: CloudConnectAzureFormProps,
) {
  return (
    <form
      action="/cloud/azure/auth/signin"
      {// method="POST"
      ...props}
      class={classSet(props, "w-full max-w-sm md:max-w-md mx-auto py-3 mt-8")}
    >
      <div class="flex flex-wrap -mx-3 mb-4">
        <div class="w-full px-3">
          <label class="block uppercase tracking-wide font-bold mb-2 text-xl">
            Connect to Azure
          </label>

          <p class="text-lg">
            To get started in the cloud, please connect your Azure account.
          </p>
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
            Connect Now
          </Action>
        </>
      </ActionGroup>
    </form>
  );
}
