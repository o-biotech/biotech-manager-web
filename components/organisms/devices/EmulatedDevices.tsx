import { IoTDisplay, IoTDisplayProps } from "@fathym/atomic-iot";
import { EmulatedDeviceIcon } from "$fathym/atomic-icons";
import InteractiveSlideToggle from "../../../islands/atoms/InteractiveSlideToggle.tsx";

export default function EmulatedDevices(
  props: IoTDisplayProps,
) {
  return (
    <IoTDisplay
      title={<h2 class="text-2xl font-bold">Emulated Devices</h2>}
      icon={
        <EmulatedDeviceIcon class="ml-4 mr-2 w-[36px] h-[36px] text-blue-500" />
      }
      controls={
        <>
          <InteractiveSlideToggle checked={true}>
            Enabled
          </InteractiveSlideToggle>
        </>
      }
      {...props}
    >
      <p>
        To see the dashboard in action without connecting a device, enable the
        emulated device data. When enabled, emulated data will be provided in
        your data queries. The emulated device we are showing here is for smart
        room detection and provides data on the temperature, humidity and
        occupancy of a room.
      </p>
    </IoTDisplay>
  );
}
