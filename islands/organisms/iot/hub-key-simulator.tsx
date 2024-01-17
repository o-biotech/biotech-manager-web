import { JSX } from "preact";
import { useRef, useState } from "preact/hooks";
import { CopyIcon } from "$fathym/atomic-icons";
import { CopyInput } from "../../molecules/CopyInput.tsx";
import { IoTHubKeyConnectionDisplay } from "./hub-key-connection.tsx";
import { IoTHubDeviceConnectionDisplay } from "./hub-device-connection.tsx";

export type IoTHubKeySimulatorDisplayProps =
  & JSX.HTMLAttributes<HTMLSelectElement>
  & {
    deviceKeys: Record<string, string>;

    iotHubKeys: Record<string, string>;

    resGroupLookup: string;
  };

export function IoTHubKeySimulatorDisplay(
  props: IoTHubKeySimulatorDisplayProps,
) {
  const [selectedKey, setSelectedKey] = useState("");

  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);

  const onKeyChange = (key: string) => {
    setSelectedKey(key);
  };

  const onDeviceChange = (devices: string[]) => {
    setSelectedDevices(devices);
  };

  const connStr = selectedKey
    ? `HostName=${props.resGroupLookup}-iot-hub.azure-devices.net;SharedAccessKeyName=${selectedKey};SharedAccessKey=${
      props.iotHubKeys[selectedKey]
    }`
    : "";

  const devices = selectedDevices;

  const simCmd = selectedKey
    // ? `docker run -it -e "IotHubConnectionString=${connStr}" -e Template="{ \\\"deviceId\\\": \\\"$.DeviceId\\\", \\\"rand_int\\\": $.Temp, \\\"rand_double\\\": 10, \\\"Ticks\\\": $.Ticks, \\\"Counter\\\": $.Counter, \\\"time\\\": \\\"$.Time\\\" }" -e Variables="[{name: \\\"Temp\\\", \\\"random\\\": true, \\\"max\\\": 25, \\\"min\\\": 23}, {\\\"name\\\":\\\"Counter\\\", \\\"min\\\":100, \\\"max\\\":102} ]" -e DeviceList="${
    //   devices.join(
    //     ",",
    //   )
    ? `docker run -it -e "IotHubConnectionString=${connStr}" -e DeviceList="${
      devices.join(
        ",",
      )
    }" mcr.microsoft.com/oss/azure-samples/azureiot-telemetrysimulator`
    : "";

  return (
    <>
      <IoTHubKeyConnectionDisplay
        class="px-3"
        iotHubKeys={props.iotHubKeys}
        keyChanged={onKeyChange}
      />

      <div class="w-full mb-8">
        <label
          for="connStr"
          class="block uppercase tracking-wide font-bold mb-0 text-xl"
        >
          Connection String
        </label>

        <CopyInput id="connStr" name="connStr" type="text" value={connStr} />
      </div>

      <div class="w-full">
        <IoTHubDeviceConnectionDisplay
          deviceKeys={props.deviceKeys}
          deviceChanged={onDeviceChange}
          resGroupLookup={props.resGroupLookup}
        />
      </div>

      <div class="w-full my-4">
        <label
          for="connStr"
          class="block uppercase tracking-wide font-bold mb-0 text-xl"
        >
          Simulator Command
        </label>

        <p class="block text-md mb-2">
          The simulator can be used to create and customize IoT Hub data. You
          will need docker installed, and then tweak (if desired) and then run
          the following command.
        </p>

        <CopyInput id="simCmd" name="simCmd" type="text" value={simCmd} />
      </div>
    </>
  );
}
