import {
  Action,
  ActionStyleTypes,
  MenuButton,
  MenuButtonProps,
  MenuButtonStyleTypes,
} from "@fathym/atomic";
import { ChevronDownIcon, UserIcon } from "$fathym/atomic-icons";

export default function ProfileMenu(props: MenuButtonProps) {
  return (
    <MenuButton
      menuStyle={MenuButtonStyleTypes.Responsive}
      toggleChildren={
        <>
          <UserIcon class="w-[24px] h-[24px]" />

          <ChevronDownIcon class="w-[24px] h-[24px]" />
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
