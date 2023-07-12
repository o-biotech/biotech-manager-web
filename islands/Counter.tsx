import type { Signal } from "@preact/signals";
import { Action } from "$atomic/atoms/Action.tsx";
import { ActionGroup } from "$atomic/molecules/ActionGroup.tsx";

interface CounterProps {
  count: Signal<number>;
}

export default function Counter(props: CounterProps) {
  return (
    <div class="flex gap-2 w-full">
      <p class="flex-grow-1 font-bold text-xl">{props.count}</p>

      <ActionGroup class="[&>*]:mx-1">
        <>
          <Action onClick={() => props.count.value -= 1}>
            -1
          </Action>

          <Action onClick={() => props.count.value += 1}>
            +1
          </Action>
        </>
      </ActionGroup>
    </div>
  );
}
