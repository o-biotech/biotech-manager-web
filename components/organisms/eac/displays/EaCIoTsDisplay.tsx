import { EaCIoTAsCode } from "@fathym/eac";
import { Action, ActionStyleTypes } from "@fathym/atomic";
import { DropOutMenu } from "../../../molecules/DropOutMenu.tsx";
import { SettingsIcon } from "$fathym/atomic-icons";

export function EaCIoTsDisplay(iots: Record<string, EaCIoTAsCode>) {
  const iotLookups = Object.keys(iots);

  return (
    <>
      <div>
        {iotLookups.map((iotLookup) => {
          const iot = iots[iotLookup];

          const deviceLookups = Object.keys(iot.Devices || {});

          const dashboardLookups = Object.keys(iot.Dashboards || {});

          return (
            <div class="ml-2">
              <DropOutMenu
                title={iotLookup}
                class="my-1"
                action={
                  <Action
                    actionStyle={ActionStyleTypes.Link |
                      ActionStyleTypes.Rounded |
                      ActionStyleTypes.Icon}
                    class="px-1 py-1 text-white"
                  >
                    <SettingsIcon class="w-4 h-4" />
                  </Action>
                }
              >
                <div class="ml-2 mt-1 uppercase text-sm">Devices</div>

                <div class="ml-2 border-b-[1px] border-dotted border-slate-400 dark:border-slate-700">
                </div>

                {deviceLookups.map((deviceLookup) => {
                  const device = iot.Devices![deviceLookup];

                  return (
                    <Action
                      actionStyle={ActionStyleTypes.Link |
                        ActionStyleTypes.Rounded}
                      class="text-sm text-white text-left w-full"
                    >
                      {device.Details!.Name}
                    </Action>
                  );
                })}

                <div class="ml-2 mt-1 uppercase text-sm">Dashboards</div>

                <div class="ml-2 border-b-[1px] border-dotted border-slate-400 dark:border-slate-700">
                </div>

                {dashboardLookups.map((dashboardLookup) => {
                  const dashboard = iot.Dashboards![dashboardLookup];

                  return (
                    <Action
                      actionStyle={ActionStyleTypes.Link |
                        ActionStyleTypes.Rounded}
                      class="text-sm text-white text-left w-full"
                    >
                      {dashboard.Details!.Name}
                    </Action>
                  );
                })}
              </DropOutMenu>
            </div>
          );
        })}
      </div>
    </>
  );
}
