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

export default function BiotechHeader(props: HeaderProps) {
  const logo = {
    LogoAlt: "Fathym Open BioTech",
    LogoUrl: "/o-biotech-logo.svg",
    LogoHref: "/",
  };

  return (
    <Header
      class={classSet(undefined, "bg-blue-500")}
      logo={logo}
      nav={
        <InteractiveResponsiveSet toggleChildren="☰">
          <Action href="./cloud" class="text-xl mx-1">
            Cloud
          </Action>

          <Action href="./devices" class="text-xl mx-1">
            Devices
          </Action>

          <Action href="./data" class="text-xl mx-1">
            Data
          </Action>

          <Action href="./applications" class="text-xl mx-1">
            Applications
          </Action>

          <ProfileMenu />
        </InteractiveResponsiveSet>
      }
      {...props}
    />
  );
}
