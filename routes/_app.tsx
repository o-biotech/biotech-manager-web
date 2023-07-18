import { Head } from "$fresh/runtime.ts";
import { Footer } from "$atomic/organisms/Footer.tsx";

import { AppProps } from "$fresh/server.ts";
import BiotechHeader from "../components/organisms/BiotechHeader.tsx";

export default function App({ Component }: AppProps) {
  return (
    <>
      <Head>
        <base href="/dashboard/" />

        <title>Fathym Open BioTech</title>

        <link rel="icon" type="image/png" href="./thinky.png" />
      </Head>

      <BiotechHeader />

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
