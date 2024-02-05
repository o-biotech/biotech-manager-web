import {
  Action,
  ActionStyleTypes,
  classSet,
  factory,
  Header,
  HeaderLogo,
  HeaderProps,
  MenuButton,
  MenuButtonStyleTypes,
  ResponsiveSet,
} from "@fathym/atomic";
import { NotificationIcon, UserIcon } from "$fathym/atomic-icons";
import ProfileMenu from "../../islands/common/ProfileMenu.tsx";
// import InteractiveResponsiveSet from "../../islands/molecules/InteractiveResponsiveSet.tsx";
import { SetupPhaseTypes } from "../../src/SetupPhaseTypes.tsx";
import { Logo } from "../atoms/Logo.tsx";

export type BiotechHeaderProps = HeaderProps & {
  currentUrl: URL;

  hasEaC: boolean;

  setupPhase: SetupPhaseTypes;
};

export function BiotechHeader(props: BiotechHeaderProps) {
  const active = (
    <span class="bg-slate-700 bg-opacity-80 text-white shadow-inner"></span>
  );

  return (
    <Header
      logo={
        <Action
          href="/"
          actionStyle={ActionStyleTypes.Link | ActionStyleTypes.Rounded}
        >
          <Logo />
        </Action>
      }
      nav={
        <ResponsiveSet class="flex-1" toggleChildren="☰">
          <Action
            href="/"
            actionStyle={ActionStyleTypes.Link}
            class={classSet([
              "text-lg mx-1",
              props.currentUrl.pathname === "/" ? active.props.class : "",
            ])}
          >
            Dashboard
          </Action>

          <div class="flex-1"></div>

          <Action
            class="mx-2"
            actionStyle={ActionStyleTypes.Link |
              ActionStyleTypes.Rounded |
              ActionStyleTypes.Icon}
          >
            <NotificationIcon class="w-6 h-6" />
          </Action>

          <ProfileMenu />
        </ResponsiveSet>
      }
      {...props}
      class={classSet(["-:z-50 -:sticky -:top-0 -:drop-shadow-md"], props)}
    />
  );
}
