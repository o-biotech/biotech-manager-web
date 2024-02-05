import { classSet, Display } from "@fathym/atomic";
import { JSX } from "preact";
import EmulatedDevices from "./devices/EmulatedDevices.tsx";
import ConnectedDevices from "./devices/ConnectedDevices.tsx";
import DevicesTelemetry from "./devices/DevicesTelemetry.tsx";
import { DevicesDashboardControls } from "../../islands/organisms/iot/devices-dashboard-controls.tsx";
import { EaCDeviceAsCode } from "@fathym/eac";

export type BiotechDashboardProps = {
  devices: Record<string, EaCDeviceAsCode>;

  jwt: string;
} & JSX.HTMLAttributes<HTMLDivElement>;

export function BiotechDashboard(props: BiotechDashboardProps) {
  return (
    <>
      <div {...props} class={classSet(["-:p-2 -:md:p-4"], props)}>
        <DevicesDashboardControls devices={props.devices} jwt={props.jwt} />
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
