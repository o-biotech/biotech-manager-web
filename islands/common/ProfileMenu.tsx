import {
  MenuButton,
  MenuButtonProps,
  MenuButtonStyleTypes,
} from "$atomic/molecules/MenuButton.tsx";
import { Action, ActionStyleTypes } from "$atomic/atoms/Action.tsx";
import { IconStyleTypes } from "$atomic/atoms/icons/Icon.tsx";
import { ChevronDownIcon } from "$atomic/atoms/icons/ChevronDownIcon.tsx";
import { UserIcon } from "$atomic/atoms/icons/UserIcon.tsx";
import { StateContext } from "npm:@lcu/common";

export default function ProfileMenu(props: MenuButtonProps) {
  return (
    <MenuButton
      menuStyle={MenuButtonStyleTypes.Responsive}
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
    </MenuButton>
  );
}
