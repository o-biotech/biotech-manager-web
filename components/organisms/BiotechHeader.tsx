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

export type BiotechHeaderProps = HeaderProps & {
  currentUrl: URL;

  hasEaC: boolean;

  setupPhase: SetupPhaseTypes;
};

export function BiotechHeader(props: BiotechHeaderProps) {
  const logo = {
    LogoAlt: "Fathym Open Biotech",
    LogoUrl: "/o-biotech-logo.svg",
    LogoHref: "/",
  };

  const active = <span class="bg-sky-700 bg-opacity-80 text-white"></span>;

  return (
    <Header
      logo={logo}
      nav={
        <InteractiveResponsiveSet toggleChildren="☰">
          <Action
            href="/"
            actionStyle={ActionStyleTypes.Link}
            class={classSet([
              "text-xl mx-1 text-white",
              props.currentUrl.pathname === "/" ? active.props.class : "",
            ])}
          >
            Dashboard
          </Action>

          <ProfileMenu />
        </InteractiveResponsiveSet>
      }
      {...props}
      class={classSet(["-:z-50 -:bg-sky-500 -:sticky -:top-0"], props)}
    />
  );
}
