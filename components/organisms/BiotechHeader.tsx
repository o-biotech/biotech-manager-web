import {
  Action,
  classSet,
  factory,
  Header,
  HeaderLogo,
  HeaderProps,
  ResponsiveSet,
} from "@fathym/atomic";
import ProfileMenu from "../../islands/common/ProfileMenu.tsx";
import InteractiveResponsiveSet from "../../islands/molecules/InteractiveResponsiveSet.tsx";
import InteractiveMenuIcon from "../../islands/atoms/InteractiveMenuIcon.tsx";
import { MenuIcon } from "$fathym/atomic-icons";

export type BiotechHeaderProps = HeaderProps & {
  currentUrl: URL;
};

export default function BiotechHeader(props: BiotechHeaderProps) {
  const logo = {
    LogoAlt: "Fathym Open BioTech",
    LogoUrl: "/o-biotech-logo.svg",
    LogoHref: "/",
  };

  const active = <span class="bg-blue-700 bg-opacity-80 text-white"></span>;

  return (
    <Header
      class={classSet(undefined, "bg-blue-500 sticky top-0")}
      logo={logo}
      nav={
        <InteractiveResponsiveSet toggleChildren="☰">
          <Action
            href="./cloud"
            class={classSet(
              undefined,
              "text-xl mx-1",
              props.currentUrl.pathname.startsWith("/cloud")
                ? active.props.class
                : "",
            )}
          >
            Cloud
          </Action>

          <Action
            href="./devices"
            class={classSet(
              undefined,
              "text-xl mx-1",
              props.currentUrl.pathname.startsWith("/devices")
                ? active.props.class
                : "",
            )}
          >
            Devices
          </Action>

          <Action
            href="./data"
            class={classSet(
              undefined,
              "text-xl mx-1",
              props.currentUrl.pathname.startsWith("/data")
                ? active.props.class
                : "",
            )}
          >
            Data
          </Action>

          <Action
            href="./applications"
            class={classSet(
              undefined,
              "text-xl mx-1",
              props.currentUrl.pathname.startsWith("/applications")
                ? active.props.class
                : "",
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
