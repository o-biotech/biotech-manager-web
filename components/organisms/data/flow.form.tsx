import { JSX } from "preact";
import { Action, ActionGroup, classSet, Input } from "@fathym/atomic";
import { callToActionStyles } from "../../styles/actions.tsx";
import { CopyInput } from "../../../islands/molecules/CopyInput.tsx";
import { IoTHubKeySimulatorDisplay } from "../../../islands/organisms/iot/hub-key-simulator.tsx";
import { DeviceDataFlowing } from "../../../islands/organisms/iot/device-data-flowing.tsx";

export type DataFlowFormProps = JSX.HTMLAttributes<HTMLFormElement> & {
  apiBase: string;

  deviceKeys: Record<string, string>;

  iotHubKeys: Record<string, string>;

  jwt: string;

  resGroupLookup: string;
};

export function DataFlowForm(props: DataFlowFormProps) {
  return (
    <form
      method="post"
      action="/api/eac/data/flow"
      {...props}
      class={classSet(props, "w-full max-w-sm md:max-w-md mx-auto p-3 mt-8")}
    >
      <div class="flex flex-wrap -mx-3 mb-4 text-left">
        <Input id="flowing" name="flowing" type="hidden" value="true" />

        <div class="w-full p-3">
          <label class="block uppercase tracking-wide font-bold mb-2 text-xl">
            Data Flow
          </label>

          <p class="block text-md mb-8">
            With everything setup, the next step is to ensure data is flowing.
            The following will help you connect a real device or allow you to
            start sending emulated data. Once verified we'll move on to look at
            the data in the configured dashboards.
          </p>
        </div>

        <IoTHubKeySimulatorDisplay
          deviceKeys={props.deviceKeys}
          iotHubKeys={props.iotHubKeys}
          resGroupLookup={props.resGroupLookup}
        />
      </div>

      <DeviceDataFlowing
        apiBase={props.apiBase}
        jwt={props.jwt}
        waitingText="Waiting for device data (this can take several minutes after posting your data)..."
        class="w-20 h-20"
      >
        <ActionGroup class="mt-8 flex-col">
          <>
            <Action
              type="submit"
              class={classSet(
                callToActionStyles.props,
                "w-full md:w-auto text-white font-bold m-1 py-2 px-4 rounded focus:outline-none shadow-lg",
              )}
            >
              Move to Explore Data
            </Action>
          </>
        </ActionGroup>
      </DeviceDataFlowing>
    </form>
  );
}
