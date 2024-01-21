import { ComponentChildren, JSX } from "preact";
import { Action, ActionStyleTypes } from "@fathym/atomic";
import { EaCStatus } from "@fathym/eac";
import { DeleteIcon } from "$fathym/atomic-icons";

export type DeleteActionProps = {
  children: ComponentChildren;

  message: string;
};

export function DeleteAction(props: DeleteActionProps) {
  const deleteAction = (e: JSX.TargetedEvent<HTMLFormElement, Event>) => {
    e.preventDefault();

    if (confirm(props.message)) {
      fetch("", {
        method: "DELETE",
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

  return (
    <form onSubmit={(e) => deleteAction(e)}>
      <Action
        class="flex flex-row items-center align-center w-full bg-red-500 hover:bg-red-600"
        type="submit"
      >
        <span class="flex-none">{props.children}</span>

        <span class="flex-1"></span>

        <DeleteIcon class="flex-none w-6 h-6 text-white" />
      </Action>
    </form>
  );
}
