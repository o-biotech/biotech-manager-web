import { JSX } from "preact";
import { Action, ActionStyleTypes, ActionGroup, Input } from "@fathym/atomic";
import {
  EaCStatus,
  EaCStatusProcessingTypes,
  UserEaCRecord,
} from "@fathym/eac";
import { BeginIcon, DeleteIcon } from "$fathym/atomic-icons";

export type EntepriseManagementItemProps = {
  enterprise: UserEaCRecord;
};

export function EntepriseManagementItem(props: EntepriseManagementItemProps) {
  const deleteEnterprise = (e: JSX.TargetedEvent<HTMLFormElement, Event>) => {
    e.preventDefault();

    // if (
    //   confirm(
    //     `Are you sure you want to delete ${props.enterprise.EnterpriseName}?`,
    //   )
    // ) {
    //   // deleteFormRef.
    //   fetch("", {
    //     method: "DELETE",
    //     body: JSON.stringify({
    //       EnterpriseLookup: props.enterprise.EnterpriseLookup,
    //     }),
    //   }).then((response) => {
    //     response.json().then((status: EaCStatus) => {
    //       if (status.Processing === EaCStatusProcessingTypes.COMPLETE) {
    //         location.reload();
    //       } else {
    //         console.log(status);
    //         alert(status.Messages["Error"]);
    //       }
    //     });
    //   });
    // }
  };

  const setActiveEnterprise = (
    e: JSX.TargetedEvent<HTMLFormElement, Event>,
  ) => {
    e.preventDefault();

    // if (
    //   confirm(
    //     `Are you sure you want to set ${props.enterprise.EnterpriseName} as active?`,
    //   )
    // ) {
    //   // deleteFormRef.
    //   fetch("", {
    //     method: "PUT",
    //     body: JSON.stringify({
    //       EnterpriseLookup: props.enterprise.EnterpriseLookup,
    //     }),
    //   }).then((response) => {
    //     response.json().then((status: EaCStatus) => {
    //       if (status.Processing === EaCStatusProcessingTypes.COMPLETE) {
    //         location.reload();
    //       } else {
    //         console.log(status);
    //         alert(status.Messages["Error"]);
    //       }
    //     });
    //   });
    // }
  };

  return (
    <div class="flex flex-row justify-center items-center">
      <h1 class="text-lg">{props.enterprise.EnterpriseName}</h1>

      <ActionGroup>
        <>
          <form onSubmit={(e) => setActiveEnterprise(e)}>
            <Action actionStyle={ActionStyleTypes.Link}>
              <BeginIcon class="w-6 h-6 text-sky-500" />
            </Action>
          </form>

          <form onSubmit={(e) => deleteEnterprise(e)}>
            <Action type="submit" actionStyle={ActionStyleTypes.Link}>
              <DeleteIcon class="w-6 h-6 text-red-500" />
            </Action>
          </form>
        </>
      </ActionGroup>
    </div>
  );
}
