import { ComponentChildren } from 'preact';
import { EaCEnterpriseDetails } from '@fathym/eac';
import {
  SideBarMenuItem,
  SideBarMenuItemSettings,
} from '../../islands/molecules/SideBar.tsx';
import { OpenBiotechManagerState } from '../OpenBiotechManagerState.tsx';
import { SetupPhaseTypes } from '../SetupPhaseTypes.tsx';

export function loadOoenBiotechSideBarMenuItems(
  state: OpenBiotechManagerState
): SideBarMenuItem[] {
  const { EnterpriseLookup, ParentEnterpriseLookup, ...eac } = state.EaC || {};

  console.log(EnterpriseLookup);
  console.log(ParentEnterpriseLookup);

  const eacKeys = Object.keys(eac);

  const menuItems: SideBarMenuItem[] = [];

  if (state.Phase !== SetupPhaseTypes.Complete) {
    eacKeys.forEach((key) => {
      menuItems.push({
        Name: key,
        Icon: key,
      });
    });
  } else {
    menuItems.push({
      Icon: 'GettingStarted',
      Name: 'Getting Started',
    });
  }

  return menuItems;
}

export function EaCDetailsDisplay(details: EaCEnterpriseDetails) {
  return (
    <div>
      <h1>{details.Name}</h1>

      <p>{details.Description}</p>
    </div>
  );
}

export function loadOoenBiotechSideBarSettings(
  state: OpenBiotechManagerState,
  menuItemNames: string[]
): Record<string, SideBarMenuItemSettings> {
  const settings: Record<string, SideBarMenuItemSettings> =
    menuItemNames.reduce((prev, menuItemName) => {
      const data = state.EaC![menuItemName] || {};

      switch (menuItemName) {
        case 'Details': {
          prev[menuItemName] = {
            Title: 'Enterprise Details',
            Display: <EaCDetailsDisplay {...data} />,
          };
          break;
        }

        case 'SourceConnections': {
          prev[menuItemName] = {
            Title: 'Source Connections',
          };
          break;
        }

        case 'DevOpsActions': {
          prev[menuItemName] = {
            Title: 'DevOps Actions Details',
          };
          break;
        }

        default: {
          prev[menuItemName] = {};
          break;
        }
      }

      return prev;
    }, {} as Record<string, SideBarMenuItemSettings>);

  return settings;
}
