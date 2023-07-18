import {
  MenuButton,
  MenuButtonProps,
  MenuButtonStyleTypes,
} from "$atomic/molecules/MenuButton.tsx";
import { Action, ActionStyleTypes } from "$atomic/atoms/Action.tsx";
import { IconStyleTypes } from "$atomic/atoms/icons/Icon.tsx";
import { ChevronDownIcon } from "$atomic/atoms/icons/ChevronDownIcon.tsx";
import { UserIcon } from "$atomic/atoms/icons/UserIcon.tsx";
import {
  ResponsiveSet,
  ResponsiveSetProps,
} from "$atomic/molecules/ResponsiveSet.tsx";

export default function InteractiveResponsiveSet(props: ResponsiveSetProps) {
  return <ResponsiveSet {...props} />;
}
