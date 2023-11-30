import { JSX } from "preact";
import {
  Action,
  ActionGroup,
  ActionStyleTypes,
  classSet,
  Input,
} from "@fathym/atomic";
import { Location } from "npm:@azure/arm-subscriptions";
import { callToActionStyles } from "../../styles/actions.tsx";
import { CopyInput } from "../../../islands/molecules/CopyInput.tsx";

export type APIJWTFormProps = JSX.HTMLAttributes<HTMLFormElement> & {
  jwt: string;
};

export function APIJWTForm(props: APIJWTFormProps) {
  return (
    <form
      method="post"
      action="/api/eac/iot/data-apis-jwt"
      {...props}
      class={classSet(props, "w-full max-w-sm md:max-w-md mx-auto p-3 mt-8")}
    >
      <div class="flex flex-wrap -mx-3 mb-4 text-left">
        <div class="w-full px-3">
          <label
            for="device"
            class="block uppercase tracking-wide font-bold mb-0 text-xl"
          >
            Open Biotech Data APIs
          </label>

          <p class="block text-md mb-8">
            Copy the following API Key for your records, in order to use it to
            call your data APIs.
          </p>

          <CopyInput id="jwt" name="jwt" type="text" value={props.jwt} />
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
            Move to Setup Dashboards
          </Action>

          <Action
            href="./devices"
            class="m-2"
            actionStyle={ActionStyleTypes.Link |
              ActionStyleTypes.Outline |
              ActionStyleTypes.Rounded}
          >
            Regenerate API Key
          </Action>
        </>
      </ActionGroup>
    </form>
  );
}
