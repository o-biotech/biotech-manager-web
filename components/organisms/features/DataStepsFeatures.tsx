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
        title: "Setup Cold, Warm, and Hot Storage",
        description:
          "Collect and consume your cold, warm and hot storage data.",
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
        title: "Configure Data APIs",
        description: "Get familiar with and control access to your data APIs.",
        children: (
          <ActionGroup class="[&>*]:mx-1 my-2 mt-8">
            <>
              <Action
                href="./"
                class={classSet(callToActionStyles.props, "m-2")}
              >
                Configure
              </Action>
            </>
          </ActionGroup>
        ),
      }, {
        title: "Setup Data Dashboards",
        description:
          "Collect and consume your device data in pre-configured dashboards.",
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
