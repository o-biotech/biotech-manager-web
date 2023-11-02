import { ComponentChildren, JSX } from "preact";
import * as ArmResource from "npm:@azure/arm-subscriptions";
import { StepsFeatures, StepsFeaturesProps } from "@fathym/atomic";
import { CloudPhaseTypes } from "../../../src/CloudPhaseTypes.tsx";
import CloudCALZForm from "./calz.form.tsx";
import CloudConnectForms from "../../../islands/organisms/CloudConnectForms.tsx";
import CloudIoTForm from "./iot.form.tsx";
import ConnectAzure from "./ConnectAzure.tsx";

export type CloudStepsFeaturesProps = StepsFeaturesProps & {
  cloudPhase: CloudPhaseTypes;

  isConnected: boolean;

  subs: ArmResource.Subscription[];
};

export default function CloudStepsFeatures(props: CloudStepsFeaturesProps) {
  let currentForm: ComponentChildren = undefined;

  switch (props.cloudPhase) {
    case CloudPhaseTypes.Connect:
      currentForm = (
        <ConnectAzure
          isConnected={props.isConnected}
          subs={props.subs}
          class="px-4"
        />
      );
      break;

    case CloudPhaseTypes.CALZ:
      currentForm = <CloudCALZForm class="px-4" />;
      break;

    case CloudPhaseTypes.Infrastucture:
      currentForm = <CloudIoTForm class="px-4" />;
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
      step={props.cloudPhase}
    >
      {[{
        title: "Connect to Azure",
        description:
          "Bring your own Azure Cloud connection or get started with a Fathym Managed Azure Subscription.",
        children: smCurrentForm,
      }, {
        title: "Cloud Landing Zone",
        description:
          "Deploy Fathym's Composable Application Landing Zone (CALZ) to prepare your cloud for devices and applications.",
        children: smCurrentForm,
      }, {
        title: "IoT Infrastructure",
        description:
          "Establish the foundation of your IoT infrastructure for the creation of device flows and data access.",
        children: smCurrentForm,
      }]}
    </StepsFeatures>
  );
}
