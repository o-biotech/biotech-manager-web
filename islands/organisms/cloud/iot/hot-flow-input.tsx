import { ComponentChildren, JSX } from "preact";
import { useRef, useState } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { Action, ActionStyleTypes, classSet, Input } from "@fathym/atomic";
import { RenewIcon } from "$fathym/atomic-icons";
import { GitHubAccessAction } from "../../../molecules/GitHubAccessAction.tsx";

export type HotFlowInputProps = {
  children?: ComponentChildren;

  hasGitHubAuth: boolean;

  organizations?: string[];
} & JSX.HTMLAttributes<HTMLInputElement>;

export function HotFlowInput(props: HotFlowInputProps) {
  // if (!IS_BROWSER) return <></>;

  const { children, organizations, ...inputProps } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const [isChecked, setIsChecked] = useState(!!props.checked);

  const hotFlowGitHub = isChecked && props.hasGitHubAuth
    ? (
      <>
        <div class="w-full mb-2">
          <label
            for="gitHubOrg"
            class="block uppercase tracking-wide font-bold mb-2 text-sm"
          >
            GitHub Organization for Devices Flow
          </label>

          <select
            id="gitHubOrg"
            name="gitHubOrg"
            required
            class="appearance-none block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:shadow-lg focus:border-blue-500 placeholder-gray-500"
          >
            <option value="">-- Select an organization --</option>

            {props.organizations?.map((org) => {
              return <option value={org}>{org}</option>;
            })}
          </select>

          <p>
            Don't see the organization your looking for? Add organizations by
            installing the{" "}
            <Action
              actionStyle={ActionStyleTypes.Link | ActionStyleTypes.Rounded}
              class="inline-block !text-blue-500 hover:!text-white py-0 px-1"
              href="https://github.com/apps/open-biotech-web-manager"
              target="_blank"
            >
              OpenBiotech App
            </Action>
          </p>
        </div>

        <div class="w-full">
          <label
            for="gitHubRepo"
            class="block uppercase tracking-wide font-bold mb-2 text-sm"
          >
            New Repository Name
          </label>

          <Input
            id="gitHubRepo"
            name="gitHubRepo"
            type="text"
            required
            placeholder="Enter new repository name"
            value="iot-ensemble-device-flow"
            class="appearance-none block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded leading-tight focus:outline-none focus:border-blue-500"
          />
        </div>
      </>
    )
    : <GitHubAccessAction>Sign in to GitHub</GitHubAccessAction>;

  return (
    <div>
      <div>
        <Input
          type="checkbox"
          {...inputProps}
          checked={isChecked}
          onClick={() => setIsChecked(!isChecked)}
        />

        {children}
      </div>

      {isChecked && <div class="ml-8 mt-1">{hotFlowGitHub}</div>}
    </div>
  );
}
