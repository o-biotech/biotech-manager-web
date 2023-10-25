import { ComponentChildren } from "preact";
import {
  Action,
  ActionGroup,
  ActionStyleTypes,
  classSet,
  StepsFeatures,
  StepsFeaturesProps,
} from "@fathym/atomic";
import { DataPhaseTypes } from "../../DataPhaseTypes.tsx";
import { callToActionStyles } from "../../styles/actions.tsx";

export interface DataStepsFeaturesProps extends StepsFeaturesProps {
  dataPhase?: DataPhaseTypes;
}

export function DataStepsFeatures(
  props: DataStepsFeaturesProps,
) {
  return (
    <StepsFeatures
      {...props}
      step={props.dataPhase}
    >
      {[{
        title: "Setup Cold Storage",
        description: "Collect and consume your cold storage data.",
        children: (
          <ActionGroup class="[&>*]:mx-1 my-2 mt-8">
            <>
              <Action
                href="./"
                class={classSet(callToActionStyles.props, "m-2")}
              >
                Setup
              </Action>
            </>
          </ActionGroup>
        ),
      }, {
        title: "Setup Warm Storage",
        description: "Collect and consume your warm storage data.",
        children: (
          <ActionGroup class="[&>*]:mx-1 my-2 mt-8">
            <>
              <Action
                href="./"
                class={classSet(callToActionStyles.props, "m-2")}
              >
                Setup
              </Action>
            </>
          </ActionGroup>
        ),
      }, {
        title: "Setup Hot Storage",
        description: "Collect and consume your hot storage data.",
        children: (
          <ActionGroup class="[&>*]:mx-1 my-2 mt-8">
            <>
              <Action
                href="./"
                class={classSet(callToActionStyles.props, "m-2")}
              >
                Setup
              </Action>
            </>
          </ActionGroup>
        ),
      }]}
    </StepsFeatures>
  );
}
