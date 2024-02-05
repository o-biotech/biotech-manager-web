import { JSX } from "preact";
import { useRef, useState } from "preact/hooks";
import { CopyIcon } from "$fathym/atomic-icons";
import { classSet } from "@fathym/atomic";
import { CheckIcon } from "$fathym/atomic-icons";

export function CopyInput(props: JSX.HTMLAttributes<HTMLInputElement>) {
  const copyRef = useRef<HTMLInputElement>(null);

  const [success, setSuccess] = useState(false);

  const copyToClipboard = (e: JSX.TargetedMouseEvent<HTMLButtonElement>) => {
    setSuccess(true);

    navigator.clipboard.writeText(props.value!.toString());

    setTimeout(() => setSuccess(false), 3500);
  };

  return (
    <>
      <input
        type="text"
        {...props}
        class={classSet(
          [
            "-:inline-block -:appearance-none -:w-[80%] -:bg-white -:text-black -:border -:border-gray-400 -:hover:border-gray-500 -:px-4 -:py-2 -:rounded -:leading-tight -:focus:outline-none -:focus:border-blue-500",
          ],
          props,
        )}
        disabled
        ref={copyRef}
      />

      <input {...props} type="hidden" />

      <button
        type="button"
        class="inline-block ml-2 text-lg"
        onClick={copyToClipboard}
      >
        {success
          ? <CheckIcon class="w-6 h-6 text-green-500" />
          : <CopyIcon class="w-6 h-6" />}
      </button>
    </>
  );
}
