import { EaCCloudAsCode } from "@fathym/eac";
import { Action, ActionStyleTypes } from "@fathym/atomic";

export function EaCCloudsDisplay(clouds: Record<string, EaCCloudAsCode>) {
  const cloudLookups = Object.keys(clouds);

  return (
    <>
      {cloudLookups.map((cloudLookup) => {
        const cloud = clouds[cloudLookup];

        return (
          <>
            <Action
              actionStyle={ActionStyleTypes.Link | ActionStyleTypes.Rounded}
              class="text-sm text-white text-left w-full"
            >
              {cloud.Details!.Name}
            </Action>
          </>
        );
      })}
    </>
  );
}
