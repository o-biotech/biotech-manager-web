import { ComponentChildren } from "preact";
import { Action, ActionStyleTypes } from "$atomic/atoms/Action.tsx";
import { ActionGroup } from "$atomic/molecules/ActionGroup.tsx";
import { DisplayStyleTypes } from "$atomic/molecules/Display.tsx";
import { Features, FeaturesProps } from "$atomic/organisms/Features.tsx";
import { classSet } from "$atomic/utils/jsx.tsx";
import { CloudPhaseTypes } from "../../CloudPhaseTypes.tsx";
import {
  StepsFeatures,
  StepsFeaturesProps,
} from "$atomic/organisms/StepsFeatures.tsx";
import { callToActionStyles } from "../../styles/actions.tsx";
import CloudConnectManagedForm from "./connect/managed.form.tsx";
import CloudCALZForm from "./calz.form.tsx";
import CloudConnectForms from "../../../islands/organisms/CloudConnectForms.tsx";
import CloudIoTForm from "./iot.form.tsx";

export interface CloudStepsFeaturesProps extends StepsFeaturesProps {
  cloudPhase?: CloudPhaseTypes;
}

export default function CloudStepsFeatures(props: CloudStepsFeaturesProps) {
  return (
    <StepsFeatures
      {...props}
      step={props.cloudPhase}
    >
      {[{
        title: "Connect to Azure",
        description:
          "Bring your own Azure Cloud connection or get started with a Fathym Managed Azure Subscription.",
        children: <CloudConnectForms class="px-4" />,
      }, {
        title: "Cloud Landing Zone",
        description:
          "Deploy Fathym's Composable Application Landing Zone (CALZ) to prepare your cloud for devices and applications.",
        children: <CloudCALZForm class="px-4" />,
      }, {
        title: "IoT Infrastructure",
        description:
          "Establish the foundation of your IoT infrastructure for the creation of device flows and data access.",
        children: <CloudIoTForm class="px-4" />,
      }]}
    </StepsFeatures>
  );
}
