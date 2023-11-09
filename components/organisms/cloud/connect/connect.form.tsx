import { JSX } from "preact";
import * as ArmResource from "npm:@azure/arm-subscriptions";
import { Action, ActionGroup, classSet, Input } from "@fathym/atomic";
import { callToActionStyles } from "../../../styles/actions.tsx";

export type CloudConnectFormProps = JSX.HTMLAttributes<HTMLFormElement>;

export function CloudConnectForm(props: CloudConnectFormProps) {
  return (
    <form
      {...props}
      class={classSet(props, "w-full max-w-sm md:max-w-md mx-auto py-3 mt-8")}
    >
      <div class="flex flex-wrap -mx-3 mb-4">
        <div class="w-full px-3">
          <label
            for="subscription-plan"
            class="block uppercase tracking-wide font-bold mb-2 text-xl"
          >
            Cloud Connection
          </label>

          <p class="block text-md mb-8">
            Use the Fathym CLI to easily create and configure an Azure cloud
            connection with a new managed subscription or existing subscription
            from your account. Using NPM, call the `npx fathym eac env clouds
            azure generate` command and then copy in the values displayed to
            this form.
          </p>

          <div class="w-full p-3">
            <label
              for="tenant-id"
              class="block uppercase tracking-wide font-bold mb-2 text-lg text-left"
            >
              Tenant ID
            </label>

            <Input
              id="tenant-id"
              name="tenant-id"
              type="text"
              required
              placeholder="Enter tenant ID"
              class="appearance-none block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded leading-tight focus:outline-none focus:border-blue-500"
            />
          </div>

          <div class="w-full p-3">
            <label
              for="subscription-id"
              class="block uppercase tracking-wide font-bold mb-2 text-lg text-left"
            >
              Subscription ID
            </label>

            <Input
              id="subscription-id"
              name="subscription-id"
              type="text"
              required
              placeholder="Enter subscription ID"
              class="appearance-none block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded leading-tight focus:outline-none focus:border-blue-500"
            />
          </div>

          <div class="w-full p-3">
            <label
              for="application-id"
              class="block uppercase tracking-wide font-bold mb-2 text-lg text-left"
            >
              Application ID
            </label>

            <Input
              id="application-id"
              name="application-id"
              type="text"
              required
              placeholder="Enter application ID"
              class="appearance-none block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded leading-tight focus:outline-none focus:border-blue-500"
            />
          </div>

          <div class="w-full p-3">
            <label
              for="application-key"
              class="block uppercase tracking-wide font-bold mb-2 text-lg text-left"
            >
              Application Auth Key
            </label>

            <Input
              id="application-key"
              name="application-key"
              type="text"
              required
              placeholder="Enter application auth key"
              class="appearance-none block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded leading-tight focus:outline-none focus:border-blue-500"
            />
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
            Connect Subscription
          </Action>
        </>
      </ActionGroup>
    </form>
  );
}
