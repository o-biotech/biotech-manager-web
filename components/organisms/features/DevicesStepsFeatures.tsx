import { ComponentChildren } from "preact";
import { StepsFeatures, StepsFeaturesProps } from "@fathym/atomic";
import { DevicesPhaseTypes } from "../../../src/DevicesPhaseTypes.tsx";
import { DeviceForm } from "../devices/device.form.tsx";
import { APIJWTForm } from "../devices/api-jwt.form.tsx";
import DevicesDashboardForm from "../devices/dashboards.form.tsx";

export interface DevicesStepsFeaturesProps extends StepsFeaturesProps {
  cloudLookup: string;

  deviceLookup?: string;

  devicesPhase?: DevicesPhaseTypes;

  iotLookup: string;

  jwt: string;

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

    case DevicesPhaseTypes.APIs:
      currentForm = <APIJWTForm class="px-4" jwt={props.jwt} />;
      break;

    case DevicesPhaseTypes.Dashboards:
      currentForm = (
        <DevicesDashboardForm class="px-4" iotLookup={props.iotLookup} />
      );
      break;
  }

  const smCurrentForm = <div class="flex md:hidden">{{ ...currentForm }}</div>;

  const mdCurrentForm = (
    <div class="hidden md:flex md:justify-center">{{ ...currentForm }}</div>
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
            "Bring your own device or select from a curated list of Biotech devices for your specific needs.",
          children: smCurrentForm,
        },
        {
          title: "Configure Data APIs",
          description:
            "Get familiar with and control access to your data APIs.",
          children: smCurrentForm,
        },
        {
          title: "Setup Data Dashboards",
          description:
            "Collect and consume your device data with pre-configured dashboards.",
          children: smCurrentForm,
        },
      ]}
    </StepsFeatures>
  );
}
