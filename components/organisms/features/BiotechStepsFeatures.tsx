import { ComponentChildren } from "preact";
import {
  Action,
  ActionGroup,
  classSet,
  FeaturesProps,
  StepsFeatures,
} from "@fathym/atomic";
import { SetupPhaseTypes } from "../../SetupPhaseTypes.tsx";
import { callToActionStyles } from "../../styles/actions.tsx";
import { ChevronRightIcon } from "$fathym/atomic-icons";

export interface BiotechStepsFeaturesProps extends FeaturesProps {
  setupPhase?: SetupPhaseTypes;
}

export function BiotechStepsFeatures(props: BiotechStepsFeaturesProps) {
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

                <ChevronRightIcon class="w-[24px] h-[24px]" />
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

                <ChevronRightIcon class="w-[24px] h-[24px]" />
              </Action>
            </>
          </ActionGroup>
        ),
      }, {
        title: "Setup Data",
        description:
          "Collect and consume your device data anywhere you need it.",
        children: (
          <ActionGroup class="[&>*]:mx-1 my-2 mt-8">
            <>
              <Action
                href="./data"
                class={classSet(
                  callToActionStyles.props,
                  "flex flex-row",
                )}
              >
                Setup Data

                <ChevronRightIcon class="w-[24px] h-[24px]" />
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

                <ChevronRightIcon class="w-[24px] h-[24px]" />
              </Action>
            </>
          </ActionGroup>
        ),
      }]}
    </StepsFeatures>
  );
}
