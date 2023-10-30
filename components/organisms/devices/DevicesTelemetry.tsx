import { DeviceTelemetryIcon } from "$fathym/atomic-icons";
import InteractiveSlideToggle from "../../../islands/atoms/InteractiveSlideToggle.tsx";
import { IoTDisplay, IoTDisplayProps } from "@fathym/atomic";

export default function DevicesTelemetry(
  props: IoTDisplayProps,
) {
  return (
    <IoTDisplay
      title={<h2 class="text-2xl font-bold">Devices Telemetry</h2>}
      icon={
        <DeviceTelemetryIcon class="ml-4 mr-2 w-[36px] h-[36px] text-blue-500" />
      }
      controls={
        <>
          <InteractiveSlideToggle checked={false}>
            Enabled
          </InteractiveSlideToggle>
        </>
      }
      {...props}
    >
      <div class="flex flex-col md:flex-row">
        <p>
          To connect a device and see its real-time data flowing through the
          system, simply enter a device name and enroll it. You will be provided
          with a connection string for your device.
        </p>

        <input type="text" />
      </div>
    </IoTDisplay>
  );
}
