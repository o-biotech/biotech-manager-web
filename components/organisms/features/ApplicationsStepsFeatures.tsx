import { ComponentChildren } from "preact";
import { Action, ActionStyleTypes } from "$atomic/atoms/Action.tsx";
import { ActionGroup } from "$atomic/molecules/ActionGroup.tsx";
import { DisplayStyleTypes } from "$atomic/molecules/Display.tsx";
import { Features, FeaturesProps } from "$atomic/organisms/Features.tsx";
import { classSet } from "$atomic/utils/jsx.tsx";
import { ApplicationsPhaseTypes } from "../../ApplicationsPhaseTypes.tsx";
import {
  StepsFeatures,
  StepsFeaturesProps,
} from "$atomic/organisms/StepsFeatures.tsx";
import { callToActionStyles } from "../../styles/actions.tsx";

export interface ApplicationsStepsFeaturesProps extends StepsFeaturesProps {
  appsPhase?: ApplicationsPhaseTypes;
}

export default function ApplicationsStepsFeatures(
  props: ApplicationsStepsFeaturesProps,
) {
  return (
    <StepsFeatures
      {...props}
      step={props.appsPhase}
    >
      {[{
        title: "Connect to GitHub",
        description: "Connect with GitHub to build your own applications.",
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
        title: "Deploy Applications",
        description:
          "Securely deploy your developed applications into the cloud.",
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
        title: "Share Progress",
        description:
          "Share ideas to colleagues, partners and/or customers with built in security and scalability.",
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
      }]}
    </StepsFeatures>
  );
}
