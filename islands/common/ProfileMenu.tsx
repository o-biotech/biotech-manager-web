import { ComponentChildren } from "preact";
import {
  Action,
  ActionStyleTypes,
  MenuButton,
  MenuButtonProps,
  MenuButtonStyleTypes,
} from "@fathym/atomic";
import { ChevronDownIcon, UserIcon } from "$fathym/atomic-icons";

export type ProfileMenuProps = Omit<MenuButtonProps, "toggleChildren"> & {
  toggleChildren?: ComponentChildren | undefined;
};

export default function ProfileMenu(props: ProfileMenuProps) {
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
          onClick={() => alert("Sign out")}
          actionStyle={ActionStyleTypes.Outline | ActionStyleTypes.Solid}
          class="w-full"
        >
          Sign Out
        </Action>
      </>
    </MenuButton>
  );
}
