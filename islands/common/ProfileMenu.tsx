import type { Signal } from "@preact/signals";
import { Menu, MenuProps, MenuStyleTypes } from "$atomic/molecules/Menu.tsx";
import { Action, ActionStyleTypes } from "$atomic/atoms/Action.tsx";
import { IconStyleTypes } from "$atomic/atoms/icons/Icon.tsx";
import { ChevronDownIcon } from "$atomic/atoms/icons/ChevronDownIcon.tsx";
import { UserIcon } from "$atomic/atoms/icons/UserIcon.tsx";

export default function ProfileMenu(props: MenuProps) {
  return (
    <Menu
      menuStyle={MenuStyleTypes.Responsive}
      toggleChildren={
        <>
          <UserIcon iconStyle={IconStyleTypes.Outline} />

          <ChevronDownIcon iconStyle={IconStyleTypes.Outline} />
        </>
      }
    >
      <>
        <Action
          onClick={() => alert("Hey")}
          actionStyle={ActionStyleTypes.Outline | ActionStyleTypes.Solid}
          class="w-full"
        >
          Contact
        </Action>

        <Action
          onClick={() => alert("Hey")}
          actionStyle={ActionStyleTypes.Outline | ActionStyleTypes.Solid}
          class="w-full"
        >
          Contact
        </Action>

        <Action
          onClick={() => alert("Hey")}
          actionStyle={ActionStyleTypes.Outline | ActionStyleTypes.Solid}
          class="w-full"
        >
          Contact
        </Action>
      </>
    </Menu>
  );
}
