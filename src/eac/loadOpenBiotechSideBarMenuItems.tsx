import { ComponentChildren } from "preact";
import {
  SideBarMenuItem,
  SideBarMenuItemSettings,
} from "../../islands/molecules/SideBar.tsx";
import { OpenBiotechManagerState } from "../OpenBiotechManagerState.tsx";
import { SetupPhaseTypes } from "../SetupPhaseTypes.tsx";
import { EaCEnterpriseDetailsDisplay } from "../../components/organisms/eac/displays/EaCEnterpriseDetailsDisplay.tsx";
import { EaCHandlersDisplay } from "../../components/organisms/eac/displays/EaCHandlersDisplay.tsx";
import { EaCCloudsDisplay } from "../../components/organisms/eac/displays/EaCCloudsDisplay.tsx";
import { EaCSourceConnectionsDisplay } from "../../components/organisms/eac/displays/EaCSourceConnectionsDisplay.tsx";
import { EaCDevOpsActionsDisplay } from "../../components/organisms/eac/displays/EaCDevOpsActionsDisplay.tsx";
import { EaCSecretsDisplay } from "../../components/organisms/eac/displays/EaCSecretsDisplay.tsx";
import { EaCSourcesDisplay } from "../../components/organisms/eac/displays/EaCSourcesDisplay.tsx";
import { EaCIoTsDisplay } from "../../components/organisms/eac/displays/EaCIoTsDisplay.tsx";
import { OpenBiotechEaC } from "./OpenBiotechEaC.ts";
import { EaCGettingStartedDisplay } from "../../components/organisms/eac/displays/EaCGettingStartedDisplay.tsx";

export function loadOoenBiotechSideBarMenuItems(
  state: OpenBiotechManagerState,
): SideBarMenuItem[] {
  const eac: OpenBiotechEaC = { ...(state.EaC || {}) };

  delete eac.EnterpriseLookup;
  delete eac.ParentEnterpriseLookup;

  const eacKeys = Object.keys(eac);

  const menuItems: SideBarMenuItem[] = [];

  if (state.Phase === SetupPhaseTypes.Complete) {
    eacKeys.forEach((key) => {
      menuItems.push({
        Name: key,
        Icon: key,
      });
    });
  } else {
    menuItems.push({
      Icon: "GettingStarted",
      Name: "GettingStarted",
    });

    if (state.EaC) {
      menuItems.push({
        Icon: "Details",
        Name: "Details",
      });
    }
  }

  return menuItems;
}

export function loadOoenBiotechSideBarSettings(
  state: OpenBiotechManagerState,
  menuItemNames: string[],
): Record<string, SideBarMenuItemSettings> {
  const settings: Record<string, SideBarMenuItemSettings> = state.EaC
    ? menuItemNames.reduce((prev, menuItemName) => {
      const data = state.EaC![menuItemName] || {};

      switch (menuItemName) {
        case "Clouds": {
          prev[menuItemName] = {
            Title: "Clouds",
            Display: <EaCCloudsDisplay {...data} />,
          };
          break;
        }

        case "Details": {
          prev[menuItemName] = {
            Title: "Enterprise Details",
            Display: (
              <EaCEnterpriseDetailsDisplay
                {...data}
                entLookup={state.EaC!.EnterpriseLookup!}
                userEaCs={state.UserEaCs}
              />
            ),
          };
          break;
        }

        case "DevOpsActions": {
          prev[menuItemName] = {
            Title: "DevOps Actions Details",
            Display: <EaCDevOpsActionsDisplay {...data} />,
          };
          break;
        }

        case "Handlers": {
          prev[menuItemName] = {
            Title: "EaC Handlers",
            Display: <EaCHandlersDisplay {...data} />,
          };
          break;
        }

        case "IoT": {
          prev[menuItemName] = {
            Title: "IoT",
            Display: <EaCIoTsDisplay {...data} />,
          };
          break;
        }

        case "Secrets": {
          prev[menuItemName] = {
            Title: "Secrets",
            Display: <EaCSecretsDisplay {...data} />,
          };
          break;
        }

        case "SourceConnections": {
          prev[menuItemName] = {
            Title: "Source Connections",
            Display: <EaCSourceConnectionsDisplay {...data} />,
          };
          break;
        }

        case "Sources": {
          prev[menuItemName] = {
            Title: "Sources",
            Display: <EaCSourcesDisplay {...data} />,
          };
          break;
        }

        default: {
          prev[menuItemName] = {};
          break;
        }
      }

      return prev;
    }, {} as Record<string, SideBarMenuItemSettings>)
    : {};

  settings["GettingStarted"] = {
    Title: "Getting Started",
    Display: <EaCGettingStartedDisplay {...state} />,
  };

  return settings;
}
