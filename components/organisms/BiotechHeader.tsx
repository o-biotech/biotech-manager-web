import {
  Action,
  ActionStyleTypes,
  classSet,
  factory,
  Header,
  HeaderLogo,
  HeaderProps,
  ResponsiveSet,
} from "@fathym/atomic";
import ProfileMenu from "../../islands/common/ProfileMenu.tsx";
import InteractiveResponsiveSet from "../../islands/molecules/InteractiveResponsiveSet.tsx";
import { SetupPhaseTypes } from "../../src/SetupPhaseTypes.tsx";
import { Logo } from "../atoms/Logo.tsx";

export type BiotechHeaderProps = HeaderProps & {
  currentUrl: URL;

  hasEaC: boolean;

  setupPhase: SetupPhaseTypes;
};

export function BiotechHeader(props: BiotechHeaderProps) {
  const active = <span class="bg-sky-700 bg-opacity-80 text-white"></span>;

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
        <InteractiveResponsiveSet toggleChildren="☰">
          <Action
            href="/"
            actionStyle={ActionStyleTypes.Link}
            class={classSet([
              "text-xl mx-1",
              props.currentUrl.pathname === "/" ? active.props.class : "",
            ])}
          >
            Dashboard
          </Action>

          <ProfileMenu />
        </InteractiveResponsiveSet>
      }
      {...props}
      class={classSet(["-:z-50 -:sticky -:top-0 -:drop-shadow-md"], props)}
    />
  );
}
