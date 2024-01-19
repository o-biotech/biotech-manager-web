import { CheckIcon } from "$fathym/atomic-icons";
import { classSet } from "@fathym/atomic";
import { OpenBiotechManagerState } from "../../../../src/OpenBiotechManagerState.tsx";
import { Checklist, ChecklistItem } from "../../../molecules/Checklist.tsx";

export function EaCGettingStartedDisplay(state: OpenBiotechManagerState) {
  const checklist: ChecklistItem[] = [];

  checklist.push({ Title: "Create Enterprise", Complete: !!state.EaC });

  checklist.push({
    Title: "Connect to Cloud",
    Complete: state.Phase > 0,
    SubList: [
      {
        Title: "Connect to Azure",
        Complete: state.Cloud.Phase > 0,
      },
      {
        Title: "Cloud Landing Zone",
        Complete: state.Cloud.Phase > 1,
      },
      {
        Title: "IoT Infrastructure",
        Complete: state.Cloud.Phase > 2,
      },
    ],
  });

  checklist.push({
    Title: "Connect Devices",
    Complete: state.Phase > 1,
    SubList: [
      {
        Title: "Connect a Device",
        Complete: state.Devices.Phase > 0,
      },
      {
        Title: "Configure Data APIs",
        Complete: state.Devices.Phase > 1,
      },
      {
        Title: "Setup Data Dashboards",
        Complete: state.Devices.Phase > 2,
      },
    ],
  });

  checklist.push({
    Title: "Setup Data",
    Complete: state.Phase > 2,
    SubList: [
      {
        Title: "Confirm Data Flowing",
        Complete: state.Data.Phase > 0,
      },
      {
        Title: "Explore Data",
        Complete: state.Data.Phase > 1,
      },
      {
        Title: "Develop Solutions",
        Complete: state.Data.Phase > 2,
      },
    ],
  });

  return <Checklist items={checklist} />;
}
