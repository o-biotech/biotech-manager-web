import { JSX } from "preact";
import { useRef, useState } from "preact/hooks";
import { CopyInput } from "../../molecules/CopyInput.tsx";

export type IoTHubKeyConnectionDisplayProps =
  & JSX.HTMLAttributes<HTMLSelectElement>
  & {
    iotHubKeys: Record<string, string>;

    keyChanged?: (key: string) => void;
  };

export function IoTHubKeyConnectionDisplay(
  props: IoTHubKeyConnectionDisplayProps,
) {
  const selectRef = useRef<HTMLSelectElement>(null);

  const keyLookups = Object.keys(props.iotHubKeys || {});

  const [selectedKey, setSelectedKey] = useState(keyLookups[0]);

  const onKeyChange = (e: JSX.TargetedEvent<HTMLSelectElement, Event>) => {
    const target = e.target! as HTMLSelectElement;

    setSelectedKey(target.value);

    if (props.keyChanged) {
      props.keyChanged(target.value);
    }
  };

  if (props.keyChanged) {
    props.keyChanged(selectedKey);
  }

  return (
    <>
      <div class="w-full">
        <label
          for="keyLookup"
          class="block uppercase tracking-wide font-bold mb-0 text-xl"
        >
          Select IoT Hub Key
        </label>

        <p class="block text-md mb-4">
          Select the IoT Hub key you'd like to use.
        </p>

        <select
          id="keyLookup"
          name="keyLookup"
          required
          {...props}
          class="appearance-none block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 my-2 rounded-lg shadow-sm focus:outline-none focus:shadow-lg focus:border-blue-500 placeholder-gray-500"
          ref={selectRef}
          onChange={onKeyChange}
        >
          {keyLookups.map((keyLookup) => {
            return <option value={keyLookup}>{keyLookup}</option>;
          })}
        </select>

        <label
          for="key"
          class="block uppercase tracking-wide font-bold mb-0 text-xl"
        >
          Key
        </label>

        {props.iotHubKeys && (
          <CopyInput
            id="key"
            name="key"
            type="text"
            class="mb-2"
            value={props.iotHubKeys[selectedKey]}
          />
        )}
      </div>
    </>
  );
}
