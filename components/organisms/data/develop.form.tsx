import { JSX } from "preact";
import { Action, ActionGroup, classSet, Input } from "@fathym/atomic";
import { callToActionStyles } from "../../styles/actions.tsx";
import { CopyInput } from "../../../islands/molecules/CopyInput.tsx";
import { APIDevelopForm } from "../../../islands/organisms/data/api-develop-form.tsx";

export type DataDevelopFormProps = JSX.HTMLAttributes<HTMLFormElement> & {
  jwt: string;
};

export function DataDevelopForm(props: DataDevelopFormProps) {
  return (
    <form
      method="post"
      action="/api/eac/data/develop"
      {...props}
      class={classSet(props, "w-full max-w-sm md:max-w-md mx-auto p-3 mt-8")}
    >
      <div class="flex flex-wrap -mx-3 mb-4 text-left">
        <Input id="developed" name="developed" type="hidden" value="true" />

        <div class="w-full p-3">
          <label class="block uppercase tracking-wide font-bold mb-2 text-xl">
            Develop Data Solutions
          </label>

          <p class="block text-md mb-8">
            Use the following information to develop custom solutions, connect
            to 3rd party services, and more.
          </p>
        </div>

        <APIDevelopForm jwt={props.jwt} />
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
            Complete Getting Started Setup
          </Action>
        </>
      </ActionGroup>
    </form>
  );
}
