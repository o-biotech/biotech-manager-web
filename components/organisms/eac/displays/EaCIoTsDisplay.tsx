import { EaCIoTAsCode } from "@fathym/eac";
import { Action, ActionStyleTypes } from "@fathym/atomic";
import { DropOutMenu } from "../../../molecules/DropOutMenu.tsx";
import { AddIcon, EditIcon } from "$fathym/atomic-icons";

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
                    href={`/enterprises/iot/${iotLookup}`}
                  >
                    <EditIcon class="w-4 h-4" />
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
                      class="ml-2 flex flex-row items-center text-sm text-left w-full"
                      href={`/enterprises/iot/${iotLookup}/devices/${deviceLookup}`}
                    >
                      <span class="flex-1">{device.Details!.Name}</span>

                      <EditIcon class="flex-none w-4 h-4" />
                    </Action>
                  );
                })}

                <div class="ml-2 mt-2 border-b-[1px] border-dotted border-slate-400 dark:border-slate-700">
                </div>

                <Action
                  actionStyle={ActionStyleTypes.Link | ActionStyleTypes.Rounded}
                  class="ml-2 flex flex-row items-center text-sm text-left w-full"
                  href={`/enterprises/iot/${iotLookup}/devices`}
                >
                  <span class="flex-1">Create Device</span>

                  <AddIcon class="flex-none w-4 h-4" />
                </Action>

                <div class="ml-2 mt-4 uppercase text-sm">Dashboards</div>

                <div class="ml-2 border-b-[1px] border-dotted border-slate-400 dark:border-slate-700">
                </div>

                {dashboardLookups.map((dashboardLookup) => {
                  const dashboard = iot.Dashboards![dashboardLookup];

                  return (
                    <Action
                      actionStyle={ActionStyleTypes.Link |
                        ActionStyleTypes.Rounded}
                      class="ml-2 flex flex-row items-center text-sm text-left w-full"
                      href={`/enterprises/iot/${iotLookup}/dashboards/${dashboardLookup}`}
                    >
                      <span class="flex-1">{dashboard.Details!.Name}</span>

                      <EditIcon class="flex-none w-4 h-4" />
                    </Action>
                  );
                })}

                <div class="ml-2 mt-2 border-b-[1px] border-dotted border-slate-400 dark:border-slate-700">
                </div>

                <Action
                  actionStyle={ActionStyleTypes.Link | ActionStyleTypes.Rounded}
                  class="ml-2 flex flex-row items-center text-sm text-left w-full"
                  href={`/enterprises/iot/${iotLookup}/dashboards`}
                >
                  <span class="flex-1">Create Dashboard</span>

                  <AddIcon class="flex-none w-4 h-4" />
                </Action>
              </DropOutMenu>
            </div>
          );
        })}

        <div class="ml-2 mt-2 border-b-[1px] border-dotted border-slate-400 dark:border-slate-700">
        </div>

        <Action
          actionStyle={ActionStyleTypes.Link | ActionStyleTypes.Rounded}
          class="ml-2 flex flex-row items-center text-sm text-left w-full"
          href={`/enterprises/iot`}
        >
          <span class="flex-1">Create IoT Config</span>

          <AddIcon class="flex-none w-4 h-4" />
        </Action>
      </div>
    </>
  );
}
