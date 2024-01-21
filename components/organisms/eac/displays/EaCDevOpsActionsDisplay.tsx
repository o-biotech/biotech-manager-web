import { EaCDevOpsActionAsCode } from "@fathym/eac";
import { Action, ActionStyleTypes } from "@fathym/atomic";
import { AddIcon, EditIcon } from "$fathym/atomic-icons";

export function EaCDevOpsActionsDisplay(
  devOpsActions: Record<string, EaCDevOpsActionAsCode>,
) {
  const devOpsActionLookups = Object.keys(devOpsActions);

  return (
    <>
      {devOpsActionLookups.map((devOpsActionLookup) => {
        const devOpsAction = devOpsActions[devOpsActionLookup];

        return (
          <>
            <Action
              actionStyle={ActionStyleTypes.Link | ActionStyleTypes.Rounded}
              class="ml-2 flex flex-row items-center text-sm text-left w-full"
            >
              <span class="flex-1">{devOpsAction.Details!.Name}</span>

              <EditIcon class="flex-none w-4 h-4" />
            </Action>
          </>
        );
      })}

      <div class="ml-2 mt-2 border-b-[1px] border-dotted border-slate-400 dark:border-slate-700">
      </div>

      <Action
        actionStyle={ActionStyleTypes.Link | ActionStyleTypes.Rounded}
        class="ml-2 flex flex-row items-center text-sm text-left w-full"
      >
        <span class="flex-1">Create Action</span>

        <AddIcon class="flex-none w-4 h-4" />
      </Action>
    </>
  );
}
