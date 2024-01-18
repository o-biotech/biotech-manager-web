import { ComponentChildren, JSX } from "preact";
import { snakeCase } from "$case";
import { ChevronRightIcon } from "$fathym/atomic-icons";
import { classSet } from "@fathym/atomic";

export type DropOutMenuProps = {
  action?: ComponentChildren;

  children: ComponentChildren;

  title: string;
} & JSX.HTMLAttributes<HTMLDivElement>;

export function DropOutMenu(props: DropOutMenuProps) {
  const key = snakeCase(props.title);

  return (
    <div {...props} class={classSet(props, "flex flex-wrap items-center")}>
      <input type="checkbox" id={key} class="peer sr-only" />

      <ChevronRightIcon class="flex-none w-4 h-4 transition-all duration-200 peer-checked:rotate-90" />

      <label
        for={key}
        class="flex-1 flex flex-row items-center peer-checked:font-bold cursor-pointer grow"
      >
        <span class="text-sm">{props.title}</span>
      </label>

      {props.action && <div class="flex-none">{props.action}</div>}

      <div class="hidden peer-checked:block bg-transparent w-full m-1">
        {props.children}
      </div>
    </div>
  );
}
