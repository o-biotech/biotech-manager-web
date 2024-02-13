import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { Input } from "@fathym/atomic";
import { CopyInput } from "../../../islands/molecules/CopyInput.tsx";

export type APIDevelopFormProps = JSX.HTMLAttributes<HTMLFormElement> & {
  jwt: string;
};

export function APIDevelopForm(props: APIDevelopFormProps) {
  if (!IS_BROWSER) return <></>;

  const warmApi = `${location.origin}/api/data/warm/explorer`;

  return (
    <div class="w-full p-3">
      <label class="block uppercase tracking-wide font-bold mb-2 text-xl">
        API Access
      </label>

      <p class="block text-md mb-8">
        Use the following to call your warm data API.
      </p>

      <div class="w-full mb-8">
        <label
          for="connStr"
          class="block uppercase tracking-wide font-bold mb-0 text-lg"
        >
          API URL
        </label>

        <CopyInput id="warmApi" name="warmApi" type="text" value={warmApi} />
      </div>

      <div class="w-full mb-8">
        <label
          for="connStr"
          class="block uppercase tracking-wide font-bold mb-0 text-lg"
        >
          API Access Token
        </label>

        <p>Set authorization header as 'Bearer (token)'</p>

        <CopyInput
          id="jwt"
          name="jwt"
          type="text"
          class="mt-2"
          value={props.jwt}
        />
      </div>
    </div>
  );
}
