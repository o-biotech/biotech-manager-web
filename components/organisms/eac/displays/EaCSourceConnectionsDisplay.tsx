import { EaCSourceConnectionAsCode } from "@fathym/eac";
import { Action, ActionStyleTypes } from "@fathym/atomic";

export function EaCSourceConnectionsDisplay(
  srcConns: Record<string, EaCSourceConnectionAsCode>,
) {
  const srcConnLookups = Object.keys(srcConns);

  return (
    <>
      {srcConnLookups.map((srcConnLookup) => {
        const srcConn = srcConns[srcConnLookup];

        return (
          <>
            <Action
              actionStyle={ActionStyleTypes.Link | ActionStyleTypes.Rounded}
              class="text-sm text-left w-full"
            >
              {srcConn.Details!.Name}
            </Action>
          </>
        );
      })}
    </>
  );
}
