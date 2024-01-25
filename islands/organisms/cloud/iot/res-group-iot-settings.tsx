import { JSX } from "preact";
import { useState } from "preact/hooks";
import { SignalLike } from "$fresh/src/types.ts";
import { DataLookup } from "@fathym/atomic";
import { CloudIoTForm } from "../../../../components/organisms/cloud/iot.form.tsx";

export type ResourceGroupIoTSettingsProps = {
  action?: string | undefined | SignalLike<string | undefined>;

  cloudLookup: string;

  hasGitHubAuth: boolean;

  organizations?: string[];

  resGroupOptions: DataLookup[];
} & JSX.HTMLAttributes<HTMLInputElement>;

export function ResourceGroupIoTSettings(props: ResourceGroupIoTSettingsProps) {
  const [curResGroup, setCurResGroup] = useState("");

  const resGroupChanged = (e: JSX.TargetedEvent<HTMLSelectElement, Event>) => {
    setCurResGroup(e.currentTarget.value);
  };

  return (
    <div>
      <div class="w-full p-3">
        <label
          for="resGroupLookup"
          class="block uppercase tracking-wide font-bold mb-2 text-lg text-left"
        >
          IoT Resource Group
        </label>

        <select
          id="resGroupLookup"
          name="resGroupLookup"
          type="text"
          value={curResGroup}
          required
          onChange={resGroupChanged}
          placeholder="Select EaC cloud resource group"
          class="appearance-none block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded leading-tight focus:outline-none focus:border-blue-500"
        >
          <option value="">-- Select EaC cloud resource group --</option>
          {props.resGroupOptions.map((option) => {
            return <option value={option.Lookup}>{option.Name}</option>;
          })}
        </select>
      </div>

      {curResGroup && (
        <CloudIoTForm
          action={props.action}
          class="px-4"
          cloudLookup={props.cloudLookup!}
          hasGitHubAuth={props.hasGitHubAuth}
          organizations={props.organizations}
          resGroupLookup={curResGroup}
        />
      )}
    </div>
  );
}
