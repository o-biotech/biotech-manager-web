import { Action } from "$atomic/atoms/Action.tsx";
import { Header, HeaderLogo, HeaderProps } from "$atomic/organisms/Header.tsx";
import { classSet, factory } from "$atomic/utils/jsx.tsx";
import ProfileMenu from "../../islands/common/ProfileMenu.tsx";
import InteractiveResponsiveSet from "../../islands/molecules/InteractiveResponsiveSet.tsx";

export default function BiotechHeader(props: HeaderProps) {
  const logo = factory(HeaderLogo, {
    LogoAlt: "Fathym Open BioTech",
    LogoUrl: "/o-biotech-logo.svg",
    LogoHref: "/",
  });

  return (
    <Header
      class={classSet(props, "bg-blue-500")}
      logo={logo}
      nav={
        <InteractiveResponsiveSet>
          <Action href="/applications" class="text-xl mx-1">
            Applications
          </Action>

          <Action href="/devices" class="text-xl mx-1">Devices</Action>

          <Action href="/cloud" class="text-xl mx-1">Cloud</Action>

          <ProfileMenu />
        </InteractiveResponsiveSet>
      }
      {...props}
    />
  );
}
