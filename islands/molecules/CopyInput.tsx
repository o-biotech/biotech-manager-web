import { JSX } from "preact";
import { useRef, useState } from "preact/hooks";
import { CopyIcon } from "$fathym/atomic-icons";
import { classSet, Input, InputProps } from "@fathym/atomic";
import { CheckIcon } from "$fathym/atomic-icons";

export function CopyInput(props: InputProps) {
  const copyRef = useRef<HTMLInputElement>(null);

  const [success, setSuccess] = useState(false);

  const copyToClipboard = (e: JSX.TargetedMouseEvent<HTMLButtonElement>) => {
    setSuccess(true);

    navigator.clipboard.writeText(props.value!.toString());

    setTimeout(() => setSuccess(false), 2500);
  };

  return (
    <div class="flex flex-row items-center">
      <Input
        type="text"
        {...props}
        class={classSet(["-:flex-1"], props)}
        disabled
        ref={copyRef}
      />

      <Input {...props} type="hidden" />

      <button
        type="button"
        class="flex-none ml-2 text-lg"
        onClick={copyToClipboard}
      >
        <CheckIcon
          class={classSet([
            "w-6 h-6 text-green-500",
            success ? "block" : "hidden",
          ])}
        />

        <CopyIcon
          class={classSet(["w-6 h-6", !success ? "block" : "hidden"])}
        />
      </button>
    </div>
  );
}
