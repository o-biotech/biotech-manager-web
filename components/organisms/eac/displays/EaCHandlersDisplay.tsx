import { EaCHandlers } from "@fathym/eac";
import { Action, ActionStyleTypes } from "@fathym/atomic";

export function EaCHandlersDisplay(handlers: EaCHandlers) {
  const handlerLookups = Object.keys(handlers);

  return (
    <>
      {handlerLookups.map((handlerLookup) => (
        <Action
          actionStyle={ActionStyleTypes.Link | ActionStyleTypes.Rounded}
          class="text-sm text-white text-left w-full"
        >
          {handlerLookup}
        </Action>
      ))}
    </>
  );
}
