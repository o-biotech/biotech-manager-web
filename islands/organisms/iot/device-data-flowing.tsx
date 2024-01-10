// deno-lint-ignore-file no-explicit-any
import { ComponentChildren, JSX } from "preact";
import { useEffect, useState } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { IconProps, RenewIcon } from "$fathym/atomic-icons";
import { classSet } from "@fathym/atomic";

export type DeviceDataFlowingProps = IconProps & {
  apiBase: string;

  children: ComponentChildren;

  jwt: string;

  waitingText?: string;
};

export function DeviceDataFlowing(props: DeviceDataFlowingProps) {
  const renewIcon = (
    <>
      {props.waitingText && (
        <div class="font-bold text-lg">{props.waitingText}</div>
      )}

      <RenewIcon
        {...props}
        class={classSet(
          props,
          "w-6 h-6 text-blue-500 animate-spin inline-block m-4",
        )}
      />
    </>
  );

  if (!IS_BROWSER) return renewIcon;

  const [hasDeviceData, setHasDeviceData] = useState(false);

  useEffect(() => {
    const checkForDeviceData = async (): Promise<boolean> => {
      const dataUrl = `${location.origin}/api/data/warm/explorer`;

      const response = await fetch(dataUrl, {
        headers: {
          Authorization: `Bearer ${props.jwt}`,
        },
      });

      const data = await response.json();

      const primaryResult = data.tables?.find(
        (t: any) => t.name === "PrimaryResult",
      ).data;

      const hasData = primaryResult?.length > 0;

      setHasDeviceData(hasData);

      return hasData;
    };

    const checkCall = () => {
      checkForDeviceData().then((condition) => {
        if (condition) {
          clearInterval(interval);
        }
      });
    };

    const interval = setInterval(checkCall, 30000);

    checkCall();
  }, []);

  return <>{hasDeviceData ? props.children : renewIcon}</>;
}
