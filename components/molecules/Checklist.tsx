import { ComponentChildren, JSX } from "preact";
import { snakeCase } from "$case";
import { CheckIcon, ChevronRightIcon } from "$fathym/atomic-icons";
import { classSet } from "@fathym/atomic";

export type ChecklistItem = {
  Complete: boolean;

  SubList?: ChecklistItem[];

  Title: string;
};

export type ChecklistProps = {
  items: ChecklistItem[];
} & JSX.HTMLAttributes<HTMLDivElement>;

export function Checklist(props: ChecklistProps) {
  return (
    <div {...props}>
      {props.items.map((item) => {
        return (
          <>
            <h1
              class={classSet([
                "flex flex-row items-center text-sm my-1",
                item.Complete ? "text-slate-500" : "text-white",
              ])}
            >
              <CheckIcon
                class={classSet([
                  "w-4 h-4 flex-none",
                  item.Complete ? "text-green-500" : undefined,
                ])}
              />

              <span class="flex-1 ml-1">{item.Title}</span>
            </h1>

            {item.SubList && (
              <div class="ml-5">
                <Checklist items={item.SubList!} />
              </div>
            )}
          </>
        );
      })}
    </div>
  );
}
