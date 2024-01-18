import { EaCSourceAsCode } from "@fathym/eac";
import { Action, ActionStyleTypes } from "@fathym/atomic";

export function EaCSourcesDisplay(sources: Record<string, EaCSourceAsCode>) {
  const sourceLookups = Object.keys(sources);

  return (
    <>
      {sourceLookups.map((sourceLookup) => {
        const source = sources[sourceLookup];

        return (
          <>
            <Action
              actionStyle={ActionStyleTypes.Link | ActionStyleTypes.Rounded}
              class="text-sm text-white text-left w-full"
            >
              {source.Details!.Name}
            </Action>
          </>
        );
      })}
    </>
  );
}
