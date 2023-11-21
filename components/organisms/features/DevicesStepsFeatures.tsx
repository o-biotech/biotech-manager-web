import { ComponentChildren } from "preact";
import {
  Action,
  ActionGroup,
  ActionStyleTypes,
  classSet,
  StepsFeatures,
  StepsFeaturesProps,
} from "@fathym/atomic";
import { DevicesPhaseTypes } from "../../../src/DevicesPhaseTypes.tsx";
import { callToActionStyles } from "../../styles/actions.tsx";
import { DeviceForm } from "../devices/device.form.tsx";

export interface DevicesStepsFeaturesProps extends StepsFeaturesProps {
  cloudLookup: string;

  deviceLookup?: string;

  devicesPhase?: DevicesPhaseTypes;

  iotLookup: string;

  resGroupLookup: string;
}

export function DevicesStepsFeatures(props: DevicesStepsFeaturesProps) {
  let currentForm: ComponentChildren = undefined;

  switch (props.devicesPhase) {
    case DevicesPhaseTypes.Connect:
      currentForm = (
        <DeviceForm
          cloudLookup={props.cloudLookup}
          deviceLookup={props.deviceLookup}
          iotLookup={props.iotLookup}
          resGroupLookup={props.resGroupLookup}
          class="px-4"
        />
      );
      break;

    case DevicesPhaseTypes.Flows:
      // currentForm = (
      //   <CloudCALZForm
      //     class="px-4"
      //     cloudLookup={props.cloudLookup!}
      //     locations={props.locations}
      //   />
      // );
      break;

    case DevicesPhaseTypes.Access:
      // currentForm = (
      //   <CloudIoTForm
      //     class="px-4"
      //     cloudLookup={props.cloudLookup!}
      //     resGroupLookup={props.resGroupLookup!}
      //   />
      // );
      break;
  }

  const smCurrentForm = <div class="flex md:hidden">{{ ...currentForm }}</div>;

  const mdCurrentForm = (
    <div class="hidden md:(flex justify-center)">{{ ...currentForm }}</div>
  );

  return (
    <StepsFeatures
      {...props}
      callToAction={mdCurrentForm}
      step={props.devicesPhase}
    >
      {[
        {
          title: "Connect a Device",
          description:
            "Bring your own device or select from a curated list of BioTech devices for your specific needs.",
          children: smCurrentForm,
        },
        {
          title: "Configure Data APIs",
          description:
            "Get familiar with and control access to your data APIs.",
          children: (
            <ActionGroup class="[&>*]:mx-1 my-2 mt-8">
              <>
                <Action
                  href="./"
                  class={classSet(callToActionStyles.props, "m-2")}
                >
                  Configure
                </Action>
              </>
            </ActionGroup>
          ),
        },
        {
          title: "Setup Data Dashboards",
          description:
            "Collect and consume your device data with pre-configured dashboards.",
          children: (
            <ActionGroup class="[&>*]:mx-1 my-2 mt-8">
              <>
                <Action
                  href="./"
                  class={classSet(callToActionStyles.props, "m-2")}
                >
                  Setup
                </Action>
              </>
            </ActionGroup>
          ),
        },
      ]}
    </StepsFeatures>
  );
}
