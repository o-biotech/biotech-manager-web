import { ComponentChildren } from "preact";
import {
  Action,
  ActionGroup,
  ActionStyleTypes,
  classSet,
  StepsFeatures,
  StepsFeaturesProps,
} from "@fathym/atomic";
import { DataPhaseTypes } from "../../../src/DataPhaseTypes.tsx";
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
        title: "Confirm Data Flowing",
        description:
          "We'll make sure that you can get data flowing to your created devices using a device simulator or your real physical devices.",
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
