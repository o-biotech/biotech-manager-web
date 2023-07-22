import { ComponentChildren } from "preact";
import { Action, ActionStyleTypes } from "$atomic/atoms/Action.tsx";
import { ActionGroup } from "$atomic/molecules/ActionGroup.tsx";
import { DisplayStyleTypes } from "$atomic/molecules/Display.tsx";
import { Features, FeaturesProps } from "$atomic/organisms/Features.tsx";
import { classSet } from "$atomic/utils/jsx.tsx";
import { DevicesPhaseTypes } from "../../DevicesPhaseTypes.tsx";
import {
  StepsFeatures,
  StepsFeaturesProps,
} from "$atomic/organisms/StepsFeatures.tsx";
import { callToActionStyles } from "../../styles/actions.tsx";

export interface DevicesStepsFeaturesProps extends StepsFeaturesProps {
  devicesPhase?: DevicesPhaseTypes;
}

export default function DevicesStepsFeatures(props: DevicesStepsFeaturesProps) {
  return (
    <StepsFeatures
      {...props}
      step={props.devicesPhase}
    >
      {[{
        title: "Connect a Device",
        description:
          "Bring your own device or select from a curated list of BioTech devices for your specific needs.",
        children: (
          <ActionGroup class="[&>*]:mx-1 my-2 mt-8">
            <>
              <Action
                href="./devices/connect/now"
                class={classSet(callToActionStyles.props, "m-2")}
              >
                Connect Device
              </Action>

              <Action
                href="./cloud/connect/acquire"
                class="m-2"
                actionStyle={ActionStyleTypes.Link |
                  ActionStyleTypes.Outline | ActionStyleTypes.Rounded}
              >
                Acquire Device
              </Action>
            </>
          </ActionGroup>
        ),
      }, {
        title: "Device Data Flows",
        description:
          "Configure your device data flows with no code tooling, high code access, and low code configurations.",
        children: (
          <ActionGroup class="[&>*]:mx-1 my-2 mt-8">
            <>
              <Action
                href="./cloud/calz"
                class={classSet(callToActionStyles.props, "m-2")}
              >
                Configure Flows
              </Action>
            </>
          </ActionGroup>
        ),
      }, {
        title: "Access Data",
        description:
          "Access your data from a wide array of APIs for cold, warm, and hot data flows.",
        children: (
          <div class="m-4 font-bold">
            Waiting for first data access, see connection details below...
          </div>
        ),
      }]}
    </StepsFeatures>
  );
}
