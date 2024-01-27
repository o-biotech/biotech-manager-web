import { ComponentChildren } from "preact";
import {
  Action,
  ActionGroup,
  classSet,
  FeaturesProps,
  StepsFeatures,
} from "@fathym/atomic";
import { SetupPhaseTypes } from "../../../src/SetupPhaseTypes.tsx";
import { callToActionStyles } from "../../styles/actions.tsx";
import { ChevronRightIcon } from "$fathym/atomic-icons";

export interface BiotechStepsFeaturesProps extends FeaturesProps {
  setupPhase?: SetupPhaseTypes;
}

export function BiotechStepsFeatures(props: BiotechStepsFeaturesProps) {
  return (
    <StepsFeatures {...props} step={props.setupPhase}>
      {[
        {
          title: "Connect to Cloud",
          description:
            "Bring your own Azure Cloud connection or get started with a Fathym Managed Azure Subscription.",
          class:
            "bg-slate-50 dark:bg-slate-800 shadow-slate-500 dark:shadow-black",
          children: (
            <ActionGroup class="[&>*]:mx-1 my-2 mt-8">
              <>
                <Action
                  href="./getting-started/cloud"
                  class={classSet(["flex flex-row"], callToActionStyles.props)}
                >
                  Connect Now
                  <ChevronRightIcon class="w-[24px] h-[24px]" />
                </Action>
              </>
            </ActionGroup>
          ),
        },
        {
          title: "Connect Devices",
          description:
            "Deploy your first device data flow and connect (or emulate) your first devices.",
          class:
            "bg-slate-50 dark:bg-slate-800 shadow-slate-500 dark:shadow-black",
          children: (
            <ActionGroup class="[&>*]:mx-1 my-2 mt-8">
              <>
                <Action
                  href="./getting-started/devices"
                  class={classSet(["flex flex-row"], callToActionStyles.props)}
                >
                  Connect Devices
                  <ChevronRightIcon class="w-[24px] h-[24px]" />
                </Action>
              </>
            </ActionGroup>
          ),
        },
        {
          title: "Setup Data",
          description:
            "Collect and consume your device data anywhere you need it.",
          class:
            "bg-slate-50 dark:bg-slate-800 shadow-slate-500 dark:shadow-black",
          children: (
            <ActionGroup class="[&>*]:mx-1 my-2 mt-8">
              <>
                <Action
                  href="./getting-started/data"
                  class={classSet(["flex flex-row"], callToActionStyles.props)}
                >
                  Setup Data
                  <ChevronRightIcon class="w-[24px] h-[24px]" />
                </Action>
              </>
            </ActionGroup>
          ),
          // }, {
          //   title: "Create Applications",
          //   description:
          //     "Easily develop and securely share your data for collaboration and consumer products.",
          //   children: (
          //     <ActionGroup class="[&>*]:mx-1 my-2 mt-8">
          //       <>
          //         <Action
          //           href="./applications"
          //           class={classSet(
          //             ["flex flex-row",
          //           ], callToActionStyles.props)}
          //         >
          //           Create Application

          //           <ChevronRightIcon class="w-[24px] h-[24px]" />
          //         </Action>
          //       </>
          //     </ActionGroup>
          //   ),
        },
      ]}
    </StepsFeatures>
  );
}
