import { ComponentChildren } from "preact";
import { StepsFeatures, StepsFeaturesProps } from "@fathym/atomic";
import { DataPhaseTypes } from "../../../src/DataPhaseTypes.tsx";
import { callToActionStyles } from "../../styles/actions.tsx";
import { DataFlowForm } from "../data/flow.form.tsx";
import { DataExploreForm } from "../../../islands/organisms/data/explore-form.tsx";
import { DataDevelopForm } from "../data/develop.form.tsx";

export interface DataStepsFeaturesProps extends StepsFeaturesProps {
  dashboardTypes: string[];

  dataPhase?: DataPhaseTypes;

  deviceKeys: Record<string, string>;

  iotHubKeys: Record<string, string>;

  jwt: string;

  kustoCluster: string;

  kustoLocation: string;

  resGroupLookup: string;
}

export function DataStepsFeatures(props: DataStepsFeaturesProps) {
  let currentForm: ComponentChildren = undefined;

  switch (props.dataPhase) {
    case DataPhaseTypes.Flow:
      currentForm = (
        <DataFlowForm
          class="px-4"
          deviceKeys={props.deviceKeys}
          iotHubKeys={props.iotHubKeys}
          jwt={props.jwt}
          resGroupLookup={props.resGroupLookup}
        />
      );
      break;

    case DataPhaseTypes.Explore:
      currentForm = (
        <DataExploreForm
          dashboardTypes={props.dashboardTypes}
          jwt={props.jwt}
          kustoCluster={props.kustoCluster}
          kustoLocation={props.kustoLocation}
          class="px-4"
        />
      );
      break;

    case DataPhaseTypes.Develop:
      currentForm = <DataDevelopForm jwt={props.jwt} class="px-4" />;
      break;
  }

  const smCurrentForm = <div class="flex md:hidden">{{ ...currentForm }}</div>;

  const mdCurrentForm = (
    <div class="hidden md:flex md:justify-center">{{ ...currentForm }}</div>
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
          class:
            "bg-slate-50 dark:bg-slate-800 shadow-slate-500 dark:shadow-black",
          children: smCurrentForm,
        },
        {
          title: "Explore Data",
          description:
            "Now that data is flowing, explore your data through configured dashboards and APIs.",
          class:
            "bg-slate-50 dark:bg-slate-800 shadow-slate-500 dark:shadow-black",
          children: smCurrentForm,
        },
        {
          title: "Develop Solutions",
          description:
            "Connect with a variety of solutions to make the best of your data.",
          class:
            "bg-slate-50 dark:bg-slate-800 shadow-slate-500 dark:shadow-black",
          children: smCurrentForm,
        },
      ]}
    </StepsFeatures>
  );
}
