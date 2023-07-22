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
        children: (
          <ActionGroup class="[&>*]:mx-1 my-2 mt-8">
            <>
              <Action
                href="./cloud/connect/managed"
                class={classSet(callToActionStyles.props, "m-2")}
              >
                Managed Subscription
              </Action>

              <Action
                href="./cloud/connect/existing"
                class="m-2"
                actionStyle={ActionStyleTypes.Link |
                  ActionStyleTypes.Outline | ActionStyleTypes.Rounded}
              >
                Connect Existing
              </Action>
            </>
          </ActionGroup>
        ),
      }, {
        title: "Cloud Landing Zone",
        description:
          "Deploy Fathym's Composable Application Landing Zone to prepare your cloud for devices and applications.",
        children: (
          <ActionGroup class="[&>*]:mx-1 my-2 mt-8">
            <>
              <Action
                href="./cloud/calz"
                class={classSet(callToActionStyles.props, "m-2")}
              >
                Configure CALZ
              </Action>
            </>
          </ActionGroup>
        ),
      }, {
        title: "IoT Infrastructure",
        description:
          "Establish the foundation of your IoT infrastructure for the creation of device flows and data access.",
        children: (
          <ActionGroup class="[&>*]:mx-1 my-2 mt-8">
            <>
              <Action
                href="./cloud/iot"
                class={classSet(callToActionStyles.props, "m-2")}
              >
                Setup IoT
              </Action>
            </>
          </ActionGroup>
        ),
      }]}
    </StepsFeatures>
  );
}
