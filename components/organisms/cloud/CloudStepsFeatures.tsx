import { ComponentChildren, JSX } from "preact";
import * as ArmSubscriptions from "npm:@azure/arm-subscriptions";
import {
  CloudCALZForm,
  StepsFeatures,
  StepsFeaturesProps,
} from "@fathym/atomic";
import { CloudPhaseTypes } from "../../../src/CloudPhaseTypes.tsx";
import { CloudIoTForm } from "./iot.form.tsx";
import { CloudConnectForms } from "./CloudConnectForms.tsx";

export type CloudStepsFeaturesProps = StepsFeaturesProps & {
  cloudLookup?: string;

  cloudPhase: CloudPhaseTypes;

  hasGitHubAuth: boolean;

  locations: ArmSubscriptions.Location[];

  organizations?: string[];

  resGroupLookup?: string;

  subs: ArmSubscriptions.Subscription[];
};

export default function CloudStepsFeatures(props: CloudStepsFeaturesProps) {
  let currentForm: ComponentChildren = undefined;

  switch (props.cloudPhase) {
    case CloudPhaseTypes.Connect:
      currentForm = <CloudConnectForms subs={props.subs} class="px-4" />;
      break;

    case CloudPhaseTypes.CALZ:
      currentForm = (
        <CloudCALZForm
          class="px-4"
          cloudLookup={props.cloudLookup!}
          locations={props.locations}
        />
      );
      break;

    case CloudPhaseTypes.Infrastucture:
      currentForm = (
        <CloudIoTForm
          action="/api/eac/clouds/iot-infrastructure"
          class="px-4"
          cloudLookup={props.cloudLookup!}
          hasGitHubAuth={props.hasGitHubAuth}
          organizations={props.organizations}
          resGroupLookup={props.resGroupLookup!}
        />
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
      step={props.cloudPhase}
    >
      {[
        {
          title: "Connect to Azure",
          description:
            "Bring your own Azure Cloud connection or get started with a Fathym Managed Azure Subscription.",
          class:
            "bg-slate-50 dark:bg-slate-800 shadow-slate-500 dark:shadow-black",
          children: smCurrentForm,
        },
        {
          title: "Cloud Landing Zone",
          description:
            "Deploy Fathym's Composable Application Landing Zone (CALZ) to prepare your cloud for devices and applications.",
          class:
            "bg-slate-50 dark:bg-slate-800 shadow-slate-500 dark:shadow-black",
          children: smCurrentForm,
        },
        {
          title: "IoT Infrastructure",
          description:
            "Establish the foundation of your IoT infrastructure for the creation of device flows and data access.",
          class:
            "bg-slate-50 dark:bg-slate-800 shadow-slate-500 dark:shadow-black",
          children: smCurrentForm,
        },
      ]}
    </StepsFeatures>
  );
}
