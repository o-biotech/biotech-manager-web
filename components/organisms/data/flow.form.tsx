import { JSX } from "preact";
import { Action, ActionGroup, classSet, Input } from "@fathym/atomic";
import { callToActionStyles } from "../../styles/actions.tsx";
import { CopyInput } from "../../../islands/molecules/CopyInput.tsx";
import { IoTHubKeySimulatorDisplay } from "../../../islands/organisms/iot/hub-key-simulator.tsx";
import { DeviceDataFlowing } from "../../../islands/organisms/iot/device-data-flowing.tsx";

export type DataFlowFormProps = JSX.HTMLAttributes<HTMLFormElement> & {
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
      class={classSet(
        ["-:w-full -:max-w-sm -:md:max-w-md -:mx-auto -:p-3 -:mt-8"],
        props,
      )}
    >
      <div class="flex flex-wrap -mx-3 mb-4 text-left">
        <Input id="flowing" name="flowing" type="hidden" value="true" />

        <div class="w-full p-3">
          <label class="block uppercase tracking-wide font-bold mb-2 text-xl">
            Data Flow
          </label>

          <p class="block text-md mb-8">
            Now that the infrastructure is in place, you can start flowing
            device telemetry to Azure IoT Hub. <br />

            <br />{" "}
            If you have a physical device at hand, there are instructions on
            using a connection string to establish device-to-cloud telemetry and
            start flowing real device data to the cloud. If you don't have a
            device or prefer to test the system with simulated data first, there
            are instructions on using Docker to generate simulated IoT Hub data.
            Once data is verified, use the dashboard services in the next step
            to view and query data.
          </p>
        </div>

        <IoTHubKeySimulatorDisplay
          deviceKeys={props.deviceKeys}
          iotHubKeys={props.iotHubKeys}
          resGroupLookup={props.resGroupLookup}
        />
      </div>

      <DeviceDataFlowing
        jwt={props.jwt}
        waitingText="Waiting for device data (this can take several minutes after posting your data)..."
        class="w-20 h-20"
      >
        <ActionGroup class="mt-8 flex-col">
          <>
            <Action
              type="submit"
              class={classSet(
                [
                  "w-full md:w-auto text-white font-bold m-1 py-2 px-4 rounded focus:outline-none shadow-lg",
                ],
                callToActionStyles.props,
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
