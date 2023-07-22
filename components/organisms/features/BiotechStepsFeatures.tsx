import { ComponentChildren } from "preact";
import { Action } from "$atomic/atoms/Action.tsx";
import { ActionGroup } from "$atomic/molecules/ActionGroup.tsx";
import { CheckIcon } from "$atomic/atoms/icons/CheckIcon.tsx";
import { ChevronRightIcon } from "$atomic/atoms/icons/ChevronRightIcon.tsx";
import { IconStyleTypes } from "$atomic/atoms/icons/Icon.tsx";
import { Features, FeaturesProps } from "$atomic/organisms/Features.tsx";
import { classSet } from "$atomic/utils/jsx.tsx";
import { SetupPhaseTypes } from "../../SetupPhaseTypes.tsx";
import {
  buildTitle,
  StepsFeatures,
  StepsFeaturesProps,
} from "$atomic/organisms/StepsFeatures.tsx";
import { callToActionStyles } from "../../styles/actions.tsx";

export interface BiotechStepsFeaturesProps extends FeaturesProps {
  setupPhase?: SetupPhaseTypes;
}

export default function BiotechStepsFeatures(props: BiotechStepsFeaturesProps) {
  return (
    <StepsFeatures
      {...props}
      step={props.setupPhase}
    >
      {[{
        title: "Connect to Cloud",
        description:
          "Bring your own Azure Cloud connection or get started with a Fathym Managed Azure Subscription.",
        children: (
          <ActionGroup class="[&>*]:mx-1 my-2 mt-8">
            <>
              <Action
                href="./cloud"
                class={classSet(
                  callToActionStyles.props,
                  "flex flex-row",
                )}
              >
                Connect Now

                <ChevronRightIcon
                  iconStyle={IconStyleTypes.Outline}
                />
              </Action>
            </>
          </ActionGroup>
        ),
      }, {
        title: "Connect Devices",
        description:
          "Deploy your first device data flow and connect (or emulate) your first devices.",
        children: (
          <ActionGroup class="[&>*]:mx-1 my-2 mt-8">
            <>
              <Action
                href="./devices"
                class={classSet(
                  callToActionStyles.props,
                  "flex flex-row",
                )}
              >
                Connect Devices

                <ChevronRightIcon
                  iconStyle={IconStyleTypes.Outline}
                />
              </Action>
            </>
          </ActionGroup>
        ),
      }, {
        title: "Create Applications",
        description:
          "Easily develop and securely share your data for collaboration and consumer products.",
        children: (
          <ActionGroup class="[&>*]:mx-1 my-2 mt-8">
            <>
              <Action
                href="./applications"
                class={classSet(
                  callToActionStyles.props,
                  "flex flex-row",
                )}
              >
                Create Application

                <ChevronRightIcon
                  iconStyle={IconStyleTypes.Outline}
                />
              </Action>
            </>
          </ActionGroup>
        ),
      }]}
    </StepsFeatures>
  );
}
