import { OpenBiotechManagerState } from "../../../../src/OpenBiotechManagerState.tsx";
import { Checklist, ChecklistItem } from "../../../molecules/Checklist.tsx";

export function EaCGettingStartedDisplay(state: OpenBiotechManagerState) {
  const checklist: ChecklistItem[] = [];

  checklist.push({
    Title: "Create Enterprise",
    Complete: !!state.EaC,
    ActionPath: "/",
  });

  checklist.push({
    Title: "Connect to Cloud",
    Complete: state.Phase > 0,
    ActionPath: "/",
    SubList: state.Cloud
      ? [
        {
          Title: "Connect to Azure",
          Complete: state.Cloud.Phase > 0,
          ActionPath: "/getting-started/cloud",
        },
        {
          Title: "Cloud Landing Zone",
          Complete: state.Cloud.Phase > 1,
          ActionPath: "/getting-started/cloud",
        },
        {
          Title: "IoT Infrastructure",
          Complete: state.Cloud.Phase > 2,
          ActionPath: "/getting-started/cloud",
        },
      ]
      : [],
  });

  checklist.push({
    Title: "Connect Devices",
    Complete: state.Phase > 1,
    ActionPath: "/",
    SubList: state.Devices
      ? [
        {
          Title: "Connect a Device",
          Complete: state.Devices.Phase > 0,
          ActionPath: "/getting-started/devices",
        },
        // {
        //   Title: "Configure Data APIs",
        //   Complete: state.Devices.Phase > 1,
        //   ActionPath: '/getting-started/devices',
        // },
        {
          Title: "Setup Data Dashboards",
          Complete: state.Devices.Phase > 2,
          ActionPath: "/getting-started/devices",
        },
      ]
      : [],
  });

  checklist.push({
    Title: "Setup Data",
    Complete: state.Phase > 2,
    ActionPath: "/",
    SubList: state.Data
      ? [
        {
          Title: "Confirm Data Flowing",
          Complete: state.Data.Phase > 0,
          ActionPath: "/getting-started/data",
        },
        {
          Title: "Explore Data",
          Complete: state.Data.Phase > 1,
          ActionPath: "/getting-started/data",
        },
        {
          Title: "Develop Solutions",
          Complete: state.Data.Phase > 2,
          ActionPath: "/getting-started/data",
        },
      ]
      : [],
  });

  return <Checklist items={checklist} />;
}
