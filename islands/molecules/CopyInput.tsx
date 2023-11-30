import { JSX } from "preact";
import { useRef } from "preact/hooks";
import { CopyIcon } from "$fathym/atomic-icons";

export function CopyInput(props: JSX.HTMLAttributes<HTMLInputElement>) {
  const copyRef = useRef<HTMLInputElement>(null);

  const copyToClipboard = (e: JSX.TargetedMouseEvent<HTMLButtonElement>) => {
    navigator.clipboard.writeText(props.value!.toString());
  };

  return (
    <>
      <input
        class="inline-block appearance-none w-[80%] bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded leading-tight focus:outline-none focus:border-blue-500"
        {...props}
        disabled
        ref={copyRef}
      />

      <input {...props} type="hidden" />

      <button
        type="button"
        class="inline-block ml-2 text-lg"
        onClick={copyToClipboard}
      >
        <CopyIcon class="w-6 h-6" />
      </button>
    </>
  );
}
