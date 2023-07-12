import { Head } from "$fresh/runtime.ts";
import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";
import { Action } from "$atomic/atoms/Action.tsx";
import { Header, HeaderLogo } from "$atomic/organisms/Header.tsx";
import { Footer } from "$atomic/organisms/Footer.tsx";

import { AppProps } from "$fresh/server.ts";

export default function App({ Component }: AppProps) {
  const logo = Object.assign(new HeaderLogo(), {
    LogoAlt: "Fathym Open BioTech",
    LogoUrl: "/logo.svg",
    LogoHref: "/",
  });

  return (
    <>
      <Head>
        <title>Fathym Open BioTech</title>
      </Head>

      <Header
        logo={logo}
        nav={[{
          class: "text-xl mx-1",
          href: "/",
          children: "Home",
        }, {
          class: "text-xl mx-1",
          href: "/about",
          children: "About",
        }, {
          class: "text-xl mx-1",
          href: "/contact",
          children: "Contact",
        }]}
      />

      <main class="flex-grow" style={{ minHeight: "calc(100vh - 15vh)" }}>
        <Component />
      </main>

      <Footer
        companyName="Fathym OpenBioTech"
        companyDescription="Deliver BioTech applications with ease, share with the masses."
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
