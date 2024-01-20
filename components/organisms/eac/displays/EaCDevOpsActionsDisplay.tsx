import { EaCDevOpsActionAsCode } from "@fathym/eac";
import { Action, ActionStyleTypes } from "@fathym/atomic";

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
              class="text-sm text-left w-full"
            >
              {devOpsAction.Details!.Name}
            </Action>
          </>
        );
      })}
    </>
  );
}
