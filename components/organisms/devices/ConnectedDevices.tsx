import { ConnectedDevicesIcon } from "$fathym/atomic-icons";
import { Action, Input, IoTDisplay, IoTDisplayProps } from "@fathym/atomic";
import { snakeCase } from "$case";

export default function ConnectedDevices(
  props: IoTDisplayProps,
) {
  return (
    <IoTDisplay
      title={<h2 class="text-2xl font-bold">Connected Devices</h2>}
      icon={
        <ConnectedDevicesIcon class="ml-4 mr-2 w-[36px] h-[36px] text-blue-500" />
      }
      controls={
        <>
        </>
      }
      {...props}
    >
      <div class="flex flex-col">
        <p>
          To connect a device and see its real-time data flowing through the
          system, simply enter a device name and enroll it. You will be provided
          with a connection string for your device.
        </p>

        <div class="flex flex-col mt-4 md:mt-8 gap-4">
          <Input
            placeholder="device-name"
            prepareValue={(v) => snakeCase(v)}
          />

          <Action onClick={() => {}}>Create Device</Action>
        </div>
      </div>
    </IoTDisplay>
  );
}
