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

  setupPhase: SetupPhaseTypes;
};

export function BiotechHeader(props: BiotechHeaderProps) {
  const logo = {
    LogoAlt: "Fathym Open BioTech",
    LogoUrl: "/o-biotech-logo.svg",
    LogoHref: "/",
  };

  const active = <span class="bg-sky-700 bg-opacity-80 text-white"></span>;

  return (
    <Header
      class={classSet(undefined, "bg-sky-500 sticky top-0")}
      logo={logo}
      nav={
        <InteractiveResponsiveSet toggleChildren="☰">
          <Action
            href="./cloud"
            actionStyle={ActionStyleTypes.Link}
            class={classSet(
              undefined,
              "text-xl mx-1 text-white",
              props.currentUrl.pathname.startsWith("/cloud")
                ? active.props.class
                : "",
            )}
          >
            Cloud
          </Action>

          <Action
            href="./devices"
            actionStyle={ActionStyleTypes.Link}
            class={classSet(
              undefined,
              "text-xl mx-1",
              props.currentUrl.pathname.startsWith("/devices")
                ? active.props.class
                : "",
              props.setupPhase > 0
                ? "text-white"
                : "pointer-events-none text-slate-400",
            )}
          >
            Devices
          </Action>

          <Action
            href="./data"
            actionStyle={ActionStyleTypes.Link}
            class={classSet(
              undefined,
              "text-xl mx-1",
              props.currentUrl.pathname.startsWith("/data")
                ? active.props.class
                : "",
              props.setupPhase > 1
                ? "text-white"
                : "pointer-events-none text-slate-400",
            )}
          >
            Data
          </Action>

          <Action
            href="./applications"
            actionStyle={ActionStyleTypes.Link}
            class={classSet(
              undefined,
              "text-xl mx-1",
              props.currentUrl.pathname.startsWith("/applications")
                ? active.props.class
                : "",
              props.setupPhase > 2
                ? "text-white"
                : "pointer-events-none text-slate-400",
            )}
          >
            Applications
          </Action>

          <ProfileMenu />
        </InteractiveResponsiveSet>
      }
      {...props}
    />
  );
}
