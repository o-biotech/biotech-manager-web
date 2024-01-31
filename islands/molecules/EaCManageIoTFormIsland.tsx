import { EaCManageIoTForm, EaCManageIoTFormProps } from "@fathym/atomic";
import { IoTHubKeySimulatorDisplay } from "../organisms/iot/hub-key-simulator.tsx";

export type EaCManageIoTFormIslandProps = {
  deviceKeys: Record<string, string>;

  iotHubKeys: Record<string, string>;

  resGroupLookup: string;
} & EaCManageIoTFormProps;

export function EaCManageIoTFormIsland(props: EaCManageIoTFormIslandProps) {
  return (
    <>
      <EaCManageIoTForm {...props} />

      {
        /* <IoTHubKeySimulatorDisplay
        deviceKeys={props.deviceKeys}
        iotHubKeys={props.iotHubKeys}
        resGroupLookup={props.resGroupLookup}
      /> */
      }
    </>
  );
}
