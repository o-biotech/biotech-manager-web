import { EaCEnterpriseDetails, UserEaCRecord } from "@fathym/eac";
import { Action, ActionStyleTypes } from "@fathym/atomic";
import { AddIcon, ChevronRightIcon, EditIcon } from "$fathym/atomic-icons";

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
        <h2 class="flex flex-row items-center text-lg font-bold">
          <span class="flex-1">{details.Name}</span>

          <Action
            actionStyle={ActionStyleTypes.Link |
              ActionStyleTypes.Rounded |
              ActionStyleTypes.Icon}
            class="flex-none"
            href={`/enterprises/${details.entLookup}`}
          >
            <EditIcon class="w-4 h-4" />
          </Action>
        </h2>

        <p class="text-sm">{details.Description}</p>
      </div>

      <div>
        <div class="flex flex-row items-center mt-4 uppercase text-md">
          <span class="flex-1">Enterprise Options</span>

          <Action
            actionStyle={ActionStyleTypes.Link |
              ActionStyleTypes.Rounded |
              ActionStyleTypes.Icon}
            class="flex-none"
            href="/enterprises"
          >
            <AddIcon class="w-4 h-4" />
          </Action>
        </div>

        <div class="border-b-[1px] border-dotted border-slate-400 dark:border-slate-700">
        </div>

        <div class="ml-2">
          {otherEaCs && otherEaCs.length > 0
            ? (
              otherEaCs.map((eac) => {
                return (
                  <Action
                    actionStyle={ActionStyleTypes.Link |
                      ActionStyleTypes.Rounded}
                    class="flex flex-row items-center px-1 py-1"
                    href={`/enterprises/${eac.EnterpriseLookup}`}
                  >
                    <span class="flex-1">{eac.EnterpriseName}</span>

                    <EditIcon class="flex-none w-4 h-4" />
                  </Action>
                );
              })
            )
            : <h3 class="text-md">No other enterprises available</h3>}
        </div>
      </div>
    </>
  );
}
