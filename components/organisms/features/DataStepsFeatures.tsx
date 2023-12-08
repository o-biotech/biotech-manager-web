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
import { DataFlowForm } from "../data/flow.form.tsx";
import { DataExploreForm } from "../data/explore.form.tsx";

export interface DataStepsFeaturesProps extends StepsFeaturesProps {
  apiBase: string;

  dataPhase?: DataPhaseTypes;

  deviceKeys: Record<string, string>;

  iotHubKeys: Record<string, string>;

  jwt: string;

  resGroupLookup: string;
}

export function DataStepsFeatures(props: DataStepsFeaturesProps) {
  let currentForm: ComponentChildren = undefined;

  switch (props.dataPhase) {
    case DataPhaseTypes.Flow:
      currentForm = (
        <DataFlowForm
          class="px-4"
          apiBase={props.apiBase}
          deviceKeys={props.deviceKeys}
          iotHubKeys={props.iotHubKeys}
          jwt={props.jwt}
          resGroupLookup={props.resGroupLookup}
        />
      );
      break;

    case DataPhaseTypes.Explore:
      currentForm = <DataExploreForm class="px-4" />;
      break;

    case DataPhaseTypes.Develop:
      // currentForm = (
      //   <DevicesDashboardForm class="px-4" iotLookup={props.iotLookup} />
      // );
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
      step={props.dataPhase}
    >
      {[
        {
          title: "Confirm Data Flowing",
          description:
            "We'll make sure that you can get data flowing to your created devices using a device simulator or your real physical devices.",
          children: smCurrentForm,
        },
        {
          title: "Explore Data",
          description:
            "Now that data is flowing, explore your data through configured dashboards and APIs.",
          children: smCurrentForm,
        },
        {
          title: "Develop Solutions",
          description:
            "Connect with a variety of solutions to make the best of your data.",
          children: smCurrentForm,
        },
      ]}
    </StepsFeatures>
  );
}
