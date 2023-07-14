import { Head } from "$fresh/runtime.ts";
import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";
import { Header, HeaderLogo } from "$atomic/organisms/Header.tsx";
import { Footer } from "$atomic/organisms/Footer.tsx";

import { AppProps } from "$fresh/server.ts";
import { Action } from "$atomic/atoms/Action.tsx";
import { factory } from "$atomic/utils/jsx.tsx";
import ProfileMenu from "../islands/common/ProfileMenu.tsx";

export default function App({ Component }: AppProps) {
  const logo = factory(HeaderLogo, {
    LogoAlt: "Fathym Open BioTech",
    LogoUrl: "/o-biotech-logo.svg",
    LogoHref: "/",
  });

  return (
    <>
      <Head>
        <title>Fathym Open BioTech</title>
      </Head>

      <Header
        logo={logo}
        nav={
          <>
            <Action href="/" class="text-xl mx-1">Home</Action>

            <Action href="/about" class="text-xl mx-1">About</Action>

            <Action href="/contact" class="text-xl mx-1">Contact</Action>

            <ProfileMenu />
          </>
        }
      />

      <main class="flex-grow" style={{ minHeight: "calc(100vh - 15vh)" }}>
        <Component />
      </main>

      <Footer
        companyName="Fathym OpenBioTech"
        companyDescription="Deliver BioTech applications with ease, share with the masses."
        class="![&_a]:text-white"
        nav={[
          {
            href: "/",
            class: "px-2 py-1 text-gray-400 hover:text-white md:mx-2",
            children: "Home",
          },
          {
            href: "/products",
            class: "px-2 py-1 text-gray-400 hover:text-white md:mx-2",
            children: "Products",
          },
          {
            href: "/services",
            class: "px-2 py-1 text-gray-400 hover:text-white md:mx-2",
            children: "Services",
          },
          {
            href: "/about-us",
            class: "px-2 py-1 text-gray-400 hover:text-white md:mx-2",
            children: "About Us",
          },
          {
            href: "/contact",
            class: "px-2 py-1 text-gray-400 hover:text-white md:mx-2",
            children: "Contact",
          },
        ]}
      />
    </>
  );
}
