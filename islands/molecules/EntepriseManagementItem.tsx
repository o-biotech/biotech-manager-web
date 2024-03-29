import { JSX } from "preact";
import { Action, ActionGroup, ActionStyleTypes, Input } from "@fathym/atomic";
import {
  EaCStatus,
  EaCStatusProcessingTypes,
  UserEaCRecord,
} from "@fathym/eac";
import { BeginIcon, DeleteIcon, EditIcon } from "$fathym/atomic-icons";

export type EntepriseManagementItemProps = {
  active: boolean;

  enterprise: UserEaCRecord;

  manage: boolean;
};

export function EntepriseManagementItem(props: EntepriseManagementItemProps) {
  const deleteEnterprise = (e: JSX.TargetedEvent<HTMLFormElement, Event>) => {
    e.preventDefault();

    if (
      confirm(
        `Are you sure you want to delete ${props.enterprise.EnterpriseName}?`,
      )
    ) {
      fetch("", {
        method: "DELETE",
        body: JSON.stringify({
          EnterpriseLookup: props.enterprise.EnterpriseLookup,
        }),
      }).then((response) => {
        // Why does EaCStatusProcessingTypes.COMPLETE break everything? Some issue with enums in island?
        response.json().then((status: EaCStatus) => {
          if (status.Processing === 3) {
            location.reload();
          } else {
            console.log(status);
            alert(status.Messages["Error"]);
          }
        });
      });
    }
  };

  const setActiveEnterprise = (
    e: JSX.TargetedEvent<HTMLFormElement, Event>,
  ) => {
    e.preventDefault();

    if (
      confirm(
        `Are you sure you want to set ${props.enterprise.EnterpriseName} as active?`,
      )
    ) {
      fetch("", {
        method: "PUT",
        body: JSON.stringify({
          EnterpriseLookup: props.enterprise.EnterpriseLookup,
        }),
      }).then((response) => {
        response.json().then((status: EaCStatus) => {
          // Why does EaCStatusProcessingTypes.COMPLETE break everything? Some issue with enums from library in island?
          if (status.Processing === 3) {
            location.reload();
          } else {
            console.log(status);
            alert(status.Messages["Error"]);
          }
        });
      });
    }
  };

  return (
    <div class="flex flex-row justify-center items-center hover:bg-slate-700 hover:text-slate-300 dark:hover:bg-slate-300 dark:hover:text-slate-700 hover:opactity-80 px-2 py-1">
      <h1 class="flex-1 text-lg ml-1">{props.enterprise.EnterpriseName}</h1>

      <ActionGroup class="flex-none">
        <>
          {!props.manage && (
            <Action
              actionStyle={ActionStyleTypes.Link |
                ActionStyleTypes.Rounded |
                ActionStyleTypes.Icon}
              href={`/enterprises/${props.enterprise.EnterpriseLookup}`}
            >
              <EditIcon class="w-6 h-6 text-blue-500" />
            </Action>
          )}

          {!props.active && (
            <form onSubmit={(e) => setActiveEnterprise(e)}>
              <Action
                actionStyle={ActionStyleTypes.Link |
                  ActionStyleTypes.Rounded |
                  ActionStyleTypes.Icon}
              >
                <BeginIcon class="w-6 h-6 text-sky-500" />
              </Action>
            </form>
          )}

          <form onSubmit={(e) => deleteEnterprise(e)}>
            <Action
              type="submit"
              actionStyle={ActionStyleTypes.Link |
                ActionStyleTypes.Rounded |
                ActionStyleTypes.Icon}
            >
              <DeleteIcon class="w-6 h-6 text-red-500" />
            </Action>
          </form>
        </>
      </ActionGroup>
    </div>
  );
}
