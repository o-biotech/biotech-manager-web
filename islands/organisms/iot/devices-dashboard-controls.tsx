// deno-lint-ignore-file no-explicit-any
import { ComponentChildren, JSX } from "preact";
import { useEffect, useState } from "preact/hooks";
import { FormatDateOptions, intlFormat } from "npm:date-fns";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { ChevronDownIcon, IconProps, RenewIcon } from "$fathym/atomic-icons";
import { classSet, Display, Input } from "@fathym/atomic";
import { EaCDeviceAsCode, ExplorerRequest } from "@fathym/eac";
import { CopyInput } from "../../molecules/CopyInput.tsx";

export type DevicesDashboardControlsProps = IconProps & {
  devices: Record<string, EaCDeviceAsCode>;

  jwt: string;
};

export function DevicesDashboardControls(props: DevicesDashboardControlsProps) {
  const renewIcon = (
    <>
      <div class="font-bold text-lg">Loading device data</div>

      <RenewIcon
        {...props}
        class={classSet(
          ["-:w-6 -:h-6 -:text-blue-500 -:animate-spin -:inline-block -:m-4"],
          props,
        )}
      />
    </>
  );

  if (!IS_BROWSER) return renewIcon;

  const [currentDeviceDisplay, setCurrentDeviceDisplay] = useState("payloads");

  const [isDeviceDataActive, setIsDeviceDataActive] = useState(true);

  const [devices, setDevices] = useState(
    Object.keys(props.devices).map((deviceId) => {
      return {
        DeviceID: deviceId,
        Active: false,
        Details: props.devices[deviceId].Details!,
      };
    }),
  );

  const [deviceData, setDeviceData] = useState([]);

  const [isLoadingData, setIsLoadingData] = useState(false);

  const handleOnDeviceClick = (e: JSX.TargetedMouseEvent<HTMLInputElement>) => {
    const cur = devices.find((d) => d.DeviceID === e.currentTarget.id)!;

    cur.Active = !cur.Active;

    setDevices(devices);
    console.log("set device active");
    console.log(devices);

    loadDeviceData().then();
  };

  const loadDeviceData = async (): Promise<void> => {
    setIsLoadingData(true);

    const dataUrl = `${location.origin}/api/data/warm/explorer`;

    const dataReq: ExplorerRequest = {
      Query: `Devices
| order by EnqueuedTime desc
| take 100`,
    };

    if (!devices.every((d) => !d.Active)) {
      const activeDevices = devices.filter((d) => d.Active);
      dataReq.Query = `let deviceIds = dynamic([${
        activeDevices
          .map((d) => `'${d.DeviceID}'`)
          .join(",")
      }]);
${dataReq.Query}
| where DeviceID in (deviceIds)`;
    }

    console.log(dataReq);

    const response = await fetch(dataUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${props.jwt}`,
      },
      body: JSON.stringify(dataReq),
    });

    const data = await response.json();

    const primaryResult = data.primaryResults[0].data;

    console.log(primaryResult[0]);

    setDeviceData(primaryResult);

    setTimeout(() => {
      setIsLoadingData(false);
    }, 0);
  };

  useEffect(() => {
    if (isDeviceDataActive) {
      const checkCall = () => {
        loadDeviceData().then(() => {
          if (!isDeviceDataActive) {
            clearInterval(interval);
          }
        });
      };

      const interval = setInterval(checkCall, 30000);

      checkCall();
    }
  }, [devices, isDeviceDataActive]);

  const rawDeviceDisplay = <pre>{JSON.stringify(deviceData, null, 2)}</pre>;

  const payloadsDeviceDisplay = (
    <div class="flex flex-col divide-y divide-gray-300 dark:divide-gray-700">
      <div class="flex-1 flex flex-row p-2">
        <div class="flex-none w-40 underline">Device ID</div>

        <div class="flex-1 underline">Processed At</div>

        <div class="flex-none w-40 underline"></div>
      </div>

      {deviceData.map(
        (dd: {
          DeviceID: string;

          EnqueuedTime: string;

          RawData: any;
        }) => {
          const enqueuedTime = intlFormat(
            new Date(Date.parse(dd.EnqueuedTime)),
            {
              timeZoneName: "longOffset",
              year: "numeric",
              month: "numeric",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
              fractionalSecondDigits: 3,
            } as Intl.DateTimeFormatOptions,
          );

          const rawData = JSON.stringify(dd.RawData, null, 2);

          const uniqueKey = dd.DeviceID + dd.EnqueuedTime + "-open";

          return (
            <div class="flex-1 flex flex-wrap items-center p-2">
              <div class="flex-none w-40">{dd.DeviceID}</div>

              <div class="flex-1">{enqueuedTime}</div>

              <div class="flex-none">
                <CopyInput class="hidden" value={rawData} />
              </div>

              <input id={uniqueKey} type="checkbox" class="sr-only peer" />

              <label
                for={uniqueKey}
                class="cursor-pointer transition-all duration-200 peer-checked:rotate-[-180deg]"
              >
                <ChevronDownIcon class="w-6 h-6" />
              </label>

              <div class="hidden peer-checked:block w-full m-2 p-2 shadow shadow-inner bg-gray-200 dark:bg-gray-700">
                <pre>{rawData}</pre>
              </div>
            </div>
          );
        },
      )}
    </div>
  );

  const streamingDeviceDisplay = <h1 class="text-2xl">Coming Soon</h1>;

  const deviceDisplay = currentDeviceDisplay === "raw"
    ? rawDeviceDisplay
    : currentDeviceDisplay === "payloads"
    ? payloadsDeviceDisplay
    : currentDeviceDisplay === "streaming"
    ? streamingDeviceDisplay
    : undefined;

  return (
    <div class="flex flex-col md:flex-row gap-4">
      <Display class="flex-none md:w-[33%] p-4 bg-slate-50 dark:bg-slate-800 shadow shadow-slate-500 dark:shadow-black">
        <h1 class="text-2xl mb-1">Devices</h1>

        {devices.map((device) => {
          return (
            <div class="flex flex-row items-center">
              <Input
                id={device.DeviceID}
                name={device.DeviceID}
                type="checkbox"
                checked={device.Active}
                onClick={handleOnDeviceClick}
                class="flex-none mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />

              <label for={device.DeviceID} class="ml-1 flex-1 text-xl">
                {device.Details.Name}
              </label>
            </div>
          );
        })}
      </Display>

      <Display class="flex-1 p-4 bg-slate-100 dark:bg-slate-800 shadow shadow-slate-500 dark:shadow-black max-h-[100vh] relative overflow-hidden">
        <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
          <li class="me-2">
            <a
              onClick={() => setCurrentDeviceDisplay("payloads")}
              aria-current="page"
              class={classSet([
                "inline-block p-4 rounded-t-lg cursor-pointer",
                currentDeviceDisplay === "payloads"
                  ? "active bg-gray-700 dark:bg-gray-300 text-blue-300 dark:text-blue-700"
                  : "bg-gray-300 dark:bg-gray-700 text-blue-700 dark:text-blue-300",
              ])}
            >
              Payloads
            </a>
          </li>

          <li class="me-2">
            <a
              onClick={() => setCurrentDeviceDisplay("streaming")}
              aria-current="page"
              class={classSet([
                "inline-block p-4 rounded-t-lg cursor-pointer",
                currentDeviceDisplay === "streaming"
                  ? "active bg-gray-700 dark:bg-gray-300 text-blue-300 dark:text-blue-700"
                  : "bg-gray-300 dark:bg-gray-700 text-blue-700 dark:text-blue-300",
              ])}
            >
              Streaming
            </a>
          </li>

          <li class="me-2">
            <a
              onClick={() => setCurrentDeviceDisplay("raw")}
              aria-current="page"
              class={classSet([
                "inline-block p-4 rounded-t-lg cursor-pointer",
                currentDeviceDisplay === "raw"
                  ? "active bg-gray-700 dark:bg-gray-300 text-blue-300 dark:text-blue-700"
                  : "bg-gray-300 dark:bg-gray-700 text-blue-700 dark:text-blue-300",
              ])}
            >
              Raw JSON
            </a>
          </li>
        </ul>

        {isLoadingData && (
          <div class="w-full">
            <div class="h-1.5 w-full bg-sky-100 overflow-hidden">
              <div class="animate-progress w-full h-full bg-sky-500 origin-left-right">
              </div>
            </div>
          </div>
        )}

        <div class="m-2 h-full overflow-auto relative">{deviceDisplay}</div>
      </Display>
    </div>
  );
}
