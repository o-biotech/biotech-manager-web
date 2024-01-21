import { EaCCloudAsCode } from "@fathym/eac";
import { Action, ActionStyleTypes } from "@fathym/atomic";
import { AddIcon, EditIcon } from "$fathym/atomic-icons";

export function EaCCloudsDisplay(clouds: Record<string, EaCCloudAsCode>) {
  const cloudLookups = Object.keys(clouds);

  return (
    <>
      {cloudLookups.map((cloudLookup) => {
        const cloud = clouds[cloudLookup];

        return (
          <>
            <Action
              actionStyle={ActionStyleTypes.Link | ActionStyleTypes.Rounded}
              class="ml-2 flex flex-row items-center text-sm text-left w-full"
            >
              <span class="flex-1">{cloud.Details!.Name}</span>

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
        <span class="flex-1">Create Cloud</span>

        <AddIcon class="flex-none w-4 h-4" />
      </Action>
    </>
  );
}
