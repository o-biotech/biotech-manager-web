import { JSX } from "preact";
import { useRef, useState } from "preact/hooks";
import { CopyInput } from "../../molecules/CopyInput.tsx";

export type IoTHubDeviceConnectionDisplayProps =
  & JSX.HTMLAttributes<HTMLSelectElement>
  & {
    deviceKeys: Record<string, string>;

    deviceChanged?: (devices: string[]) => void;

    resGroupLookup: string;
  };

export function IoTHubDeviceConnectionDisplay(
  props: IoTHubDeviceConnectionDisplayProps,
) {
  const selectRef = useRef<HTMLSelectElement>(null);

  const deviceLookups = Object.keys(props.deviceKeys);

  const [selectedDevices, setSelectedDevices] = useState([deviceLookups[0]]);

  const onDeviceChange = (e: JSX.TargetedEvent<HTMLSelectElement, Event>) => {
    const target = e.target! as HTMLSelectElement;

    const devices: string[] = Array.from(target.options)
      .filter((opt) => opt.selected)
      .map((opt) => opt.value);

    setSelectedDevices(devices);

    if (props.deviceChanged) {
      props.deviceChanged(devices);
    }
  };

  if (props.deviceChanged) {
    props.deviceChanged(selectedDevices);
  }

  const shortName = props.resGroupLookup
    .split("-")
    .map((p) => p.charAt(0))
    .join("");

  return (
    <>
      <div class="w-full">
        <label
          for="deviceLookup"
          class="block uppercase tracking-wide font-bold mb-0 text-xl"
        >
          Select IoT Hub Device
        </label>

        <p class="block text-md mb-4">
          Select the IoT Hub device you'd like to use.
        </p>

        <select
          id="deviceLookup"
          name="deviceLookup"
          required
          multiple
          {...props}
          class="appearance-none block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 my-2 rounded-lg shadow-sm focus:outline-none focus:shadow-lg focus:border-blue-500 placeholder-gray-500"
          ref={selectRef}
          onChange={onDeviceChange}
        >
          {deviceLookups.map((deviceLookup) => {
            return (
              <option
                value={deviceLookup}
                selected={selectedDevices.some((dl) => dl === deviceLookup)}
              >
                {deviceLookup}
              </option>
            );
          })}
        </select>

        <label
          for="device"
          class="block uppercase tracking-wide font-bold mt-4 mb-2 text-xl"
        >
          Device Connection Strings
        </label>

        <p class="block text-md mb-2">
          Instructions on using the device connection string.
        </p>

        {selectedDevices.map((selectedDevice) => {
          const deviceConnStr =
            `HostName=${shortName}-iot-hub.azure-devices.net;DeviceId=${selectedDevice};SharedAccessKey=${
              props.deviceKeys[selectedDevice]
            }`;

          return (
            <>
              <label
                for="device"
                class="block uppercase tracking-wide font-bold mb-0 text-md"
              >
                {selectedDevice} - Connection String
              </label>

              <CopyInput
                id="deviceConnStr"
                name="deviceConnStr"
                type="text"
                class="mb-2"
                value={deviceConnStr}
              />
            </>
          );
        })}
      </div>
    </>
  );
}
