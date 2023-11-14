import { JSX } from "preact";
import * as ArmResource from "npm:@azure/arm-subscriptions";
import { Action, ActionGroup, classSet, Input } from "@fathym/atomic";
import { callToActionStyles } from "../../styles/actions.tsx";

export type EaCCreateFormProps = JSX.HTMLAttributes<HTMLFormElement>;

export function EaCCreateForm(props: EaCCreateFormProps) {
  return (
    <form
      method="post"
      action="/api/eac"
      {...props}
      class={classSet(props, "w-full max-w-sm md:max-w-md mx-auto py-3 mt-8")}
    >
      <div class="flex flex-wrap -mx-3 mb-4">
        <div class="w-full px-3">
          <label
            for="subscription-plan"
            class="block uppercase tracking-wide font-bold mb-2 text-xl text-center"
          >
            Create Enterprise
          </label>

          <div class="w-full p-3">
            <label
              for="name"
              class="block uppercase tracking-wide font-bold mb-2 text-lg text-left"
            >
              Name
            </label>

            <Input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Enter enterprise name"
              class="appearance-none block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded leading-tight focus:outline-none focus:border-blue-500"
            />
          </div>

          <div class="w-full p-3">
            <label
              for="description"
              class="block uppercase tracking-wide font-bold mb-2 text-lg text-left"
            >
              Description
            </label>

            <Input
              id="description"
              name="description"
              type="text"
              multiline
              required
              placeholder="Enter enterprise description"
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
            Create Enterprise
          </Action>
        </>
      </ActionGroup>
    </form>
  );
}
