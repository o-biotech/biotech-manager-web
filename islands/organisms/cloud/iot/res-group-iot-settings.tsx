import { JSX } from "preact";
import { useState } from "preact/hooks";
import { SignalLike } from "$fresh/src/types.ts";
import { DataLookup } from "@fathym/atomic";
import { CloudIoTForm } from "../../../../components/organisms/cloud/iot.form.tsx";
import { IoTHubKeySimulatorDisplay } from "../../iot/hub-key-simulator.tsx";
import { IoTHubKeyConnectionDisplay } from "../../iot/hub-key-connection.tsx";
import { CopyInput } from "../../../molecules/CopyInput.tsx";

export type ResourceGroupIoTSettingsProps = {
  action?: string | undefined | SignalLike<string | undefined>;

  cloudLookup: string;

  deviceKeys: Record<string, string>;

  hasGitHubAuth: boolean;

  iotHubKeys: Record<string, string>;

  organizations?: string[];

  resGroupLookup: string;
} & JSX.HTMLAttributes<HTMLInputElement>;

export function ResourceGroupIoTSettings(props: ResourceGroupIoTSettingsProps) {
  const [curResGroup, setCurResGroup] = useState(props.resGroupLookup);

  const [selectedKey, setSelectedKey] = useState("");

  const onKeyChange = (key: string) => {
    setSelectedKey(key);
  };

  const shortName = props.resGroupLookup
    .split("-")
    .map((p) => p.charAt(0))
    .join("");

  const connStr = selectedKey
    ? `HostName=${shortName}-iot-hub.azure-devices.net;SharedAccessKeyName=${selectedKey};SharedAccessKey=${
      props.iotHubKeys[selectedKey]
    }`
    : "";

  const resGroupChanged = (e: JSX.TargetedEvent<HTMLSelectElement, Event>) => {
    setCurResGroup(e.currentTarget.value);
  };

  return (
    <div>
      {
        /* <div class="w-full p-3">
        <label
          for="resGroupLookup"
          class="block uppercase tracking-wide font-bold mb-2 text-lg text-left"
        >
          IoT Resource Group
        </label>

        <Select
          id="resGroupLookup"
          name="resGroupLookup"
          type="text"
          value={curResGroup}
          required
          onChange={resGroupChanged}
          placeholder="Select EaC cloud resource group"
        >
          <option value="">-- Select EaC cloud resource group --</option>
          {props.resGroupOptions.map((option) => {
            return <option value={option.Lookup}>{option.Name}</option>;
          })}
        </Select>
      </div> */
      }

      {curResGroup && (
        <>
          <CloudIoTForm
            action={props.action}
            class="px-4"
            cloudLookup={props.cloudLookup!}
            hasGitHubAuth={props.hasGitHubAuth}
            organizations={props.organizations}
            resGroupLookup={curResGroup}
          />

          <div class="my-8">
            <div class="my-8">
              <IoTHubKeySimulatorDisplay
                deviceKeys={props.deviceKeys}
                iotHubKeys={props.iotHubKeys}
                resGroupLookup={curResGroup}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
