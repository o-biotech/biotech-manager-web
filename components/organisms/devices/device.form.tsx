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

export type DeviceFormProps = JSX.HTMLAttributes<HTMLFormElement> & {
  cloudLookup: string;

  deviceLookup?: string;

  iotLookup: string;

  resGroupLookup: string;
};

export function DeviceForm(props: DeviceFormProps) {
  return (
    <form
      method="post"
      action="/api/eac/iot/devices/ensure"
      {...props}
      class={classSet(props, "w-full max-w-sm md:max-w-md mx-auto p-3 mt-8")}
    >
      <div class="flex flex-wrap -mx-3 mb-4 text-left">
        <Input
          id="cloudLookup"
          name="cloudLookup"
          type="hidden"
          value={props.cloudLookup}
        />

        <Input
          id="resGroupLookup"
          name="resGroupLookup"
          type="hidden"
          value={props.resGroupLookup}
        />

        <Input
          id="iotLookup"
          name="iotLookup"
          type="hidden"
          value={props.iotLookup}
        />

        <div class="w-full px-3">
          <label
            for="device"
            class="block uppercase tracking-wide font-bold mb-0 text-xl"
          >
            Device Name{" "}
          </label>

          <div class="block uppercase tracking-wide font-bold mb-2 text-sm">
            (alphanumeric with - and _)
          </div>

          <Input
            id="deviceLookup"
            name="deviceLookup"
            type="text"
            required
            disabled={!!props.deviceLookup}
            placeholder="Enter new device name"
            class="appearance-none block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded leading-tight focus:outline-none focus:border-blue-500"
          />
        </div>

        <div class="w-full p-3">
          {
            /* <label class="block uppercase tracking-wide font-bold mb-2 text-xl">
            IoT Edge Device?
          </label> */
          }

          <div class="flex items-center mb-2">
            <Input
              id="isIoTEdge"
              name="isIoTEdge"
              type="checkbox"
              value="cold"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label for="storageFlowCold" class="ms-2 text-sm font-medium pl-3">
              Is IoT Edge Device?
            </label>
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
            Save Device
          </Action>

          {
            /* <Action
            href="./cloud/connect/acquire"
            class="m-2"
            actionStyle={ActionStyleTypes.Link |
              ActionStyleTypes.Outline |
              ActionStyleTypes.Rounded}
          >
            Acquire Device
          </Action> */
          }
        </>
      </ActionGroup>
    </form>
  );
}
