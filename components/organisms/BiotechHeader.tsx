import {
  Action,
  classSet,
  factory,
  Header,
  HeaderLogo,
  HeaderProps,
} from "@fathym/atomic";
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
          <Action href="/cloud" class="text-xl mx-1">Cloud</Action>

          <Action href="/devices" class="text-xl mx-1">Devices</Action>

          <Action href="/applications" class="text-xl mx-1">
            Applications
          </Action>

          <ProfileMenu />
        </InteractiveResponsiveSet>
      }
      {...props}
    />
  );
}
