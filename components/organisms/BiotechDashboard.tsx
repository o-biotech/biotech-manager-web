import { classSet } from "@fathym/atomic";
import { JSX } from "preact";
import EmulatedDevices from "./devices/EmulatedDevices.tsx";
import ConnectedDevices from "./devices/ConnectedDevices.tsx";
import DevicesTelemetry from "./devices/DevicesTelemetry.tsx";

export type BiotechDashboardProps = JSX.HTMLAttributes<HTMLDivElement>;

export function BiotechDashboard(props: BiotechDashboardProps) {
  return (
    <>
      <div {...props} class={classSet(props, "p-2 md:p-4")}>
        <EmulatedDevices class="mb-8 md:mb-16" />

        <div class="flex flex-col md:flex-row mt-2 gap-8 md:gap-16">
          <ConnectedDevices class="w-full md:w-1/3" />

          <DevicesTelemetry class="w-full md:w-2/3" />
        </div>
      </div>

      <div>
        {
          /* <YouTubePlayer
      width={640}
      height={390}
      videoId={"r9jwGansp1E"}
      playerVars={{ mute: 1 }}
      // playerHandler={playerHandler}
      // onPlayerReady={onPlayerReady}
    /> */
        }
      </div>
    </>
  );
}
