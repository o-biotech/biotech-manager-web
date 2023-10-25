import { Head } from "$fresh/runtime.ts";
import { BasicLayout } from "@fathym/atomic";

import { AppProps } from "$fresh/server.ts";
import BiotechHeader from "../components/organisms/BiotechHeader.tsx";
import BiotechFooter from "../components/organisms/BiotechFooter.tsx";

export default function DashboardLayout({ Component }: AppProps) {
  const header = <BiotechHeader />;

  const footer = <BiotechFooter />;

  return (
    <>
      <Head>
        <title>Fathym Open BioTech</title>

        <link rel="icon" type="image/png" href="./thinky.png" />
      </Head>

      <BasicLayout header={header} footer={footer}>
        <Component />
      </BasicLayout>
    </>
  );
}
