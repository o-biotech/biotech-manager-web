import { Head } from "$fresh/runtime.ts";
import { Footer } from "@fathym/atomic";

import { AppProps } from "$fresh/server.ts";
import BiotechHeader from "../components/organisms/BiotechHeader.tsx";
import BiotechFooter from "../components/organisms/BiotechFooter.tsx";

export default function App({ Component }: AppProps) {
  return (
    <>
      <Head>
        <title>Fathym Open BioTech</title>

        <link rel="icon" type="image/png" href="./thinky.png" />
      </Head>

      <BiotechHeader />

      <main class="flex-grow" style={{ minHeight: "calc(100vh - 15vh)" }}>
        <Component />
      </main>

      <BiotechFooter />
    </>
  );
}
