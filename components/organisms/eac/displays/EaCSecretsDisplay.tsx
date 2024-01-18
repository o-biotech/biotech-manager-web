import { EaCSecretAsCode } from "@fathym/eac";
import { Action, ActionStyleTypes } from "@fathym/atomic";

export function EaCSecretsDisplay(secrets: Record<string, EaCSecretAsCode>) {
  const secretLookups = Object.keys(secrets);

  return (
    <>
      {secretLookups.map((secretLookup) => {
        return (
          <>
            <Action
              actionStyle={ActionStyleTypes.Link | ActionStyleTypes.Rounded}
              class="text-sm text-white text-left w-full"
            >
              {secretLookup}
            </Action>
          </>
        );
      })}
    </>
  );
}
