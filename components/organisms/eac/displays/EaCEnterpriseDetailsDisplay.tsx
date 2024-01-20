import { EaCEnterpriseDetails, UserEaCRecord } from "@fathym/eac";
import { Action, ActionStyleTypes } from "@fathym/atomic";
import { AddIcon } from "$fathym/atomic-icons";

export function EaCEnterpriseDetailsDisplay(
  details: EaCEnterpriseDetails & {
    entLookup: string;
    userEaCs?: UserEaCRecord[];
  },
) {
  const otherEaCs = details.userEaCs?.filter(
    (ue) => ue.EnterpriseLookup !== details.entLookup,
  );

  return (
    <>
      <div class="ml-2">
        <h2 class="text-lg font-bold">{details.Name}</h2>

        <p class="text-sm">{details.Description}</p>
      </div>

      <div>
        <div class="flex flex-row items-center mt-2 uppercase text-md">
          <span class="flex-1">Enterprise Options</span>

          <Action
            actionStyle={ActionStyleTypes.Link |
              ActionStyleTypes.Rounded |
              ActionStyleTypes.Icon}
            class="flex-none px-1 py-1 text-white"
          >
            <AddIcon class="w-4 h-4" />
          </Action>
        </div>

        <div class="border-b-[1px] border-dotted border-slate-400 dark:border-slate-700">
        </div>

        <div class="ml-2">
          {otherEaCs && otherEaCs.length > 0
            ? <span>{JSON.stringify(otherEaCs)}</span>
            : <h3 class="text-md">No other enterprises available</h3>}
        </div>
      </div>
    </>
  );
}
