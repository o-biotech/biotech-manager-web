import { Head } from "$fresh/runtime.ts";
import { BasicLayout } from "@fathym/atomic";

import { PageProps } from "$fresh/server.ts";
import { BiotechHeader } from "../components/organisms/BiotechHeader.tsx";
import { BiotechFooter } from "../components/organisms/BiotechFooter.tsx";
import { OpenBiotechManagerState } from "../src/OpenBiotechManagerState.tsx";

export default function App(
  // deno-lint-ignore no-explicit-any
  { Component, url, state }: PageProps<any, OpenBiotechManagerState>,
) {
  return (
    <>
      <Head>
        <title>Fathym Open Biotech</title>

        <link rel="icon" type="image/png" href="./thinky.png" />
        <link rel="stylesheet" href="/styles.css" />
      </Head>

      <BasicLayout
        header={
          <BiotechHeader
            currentUrl={url}
            setupPhase={state.Phase}
            hasEaC={!!state.EaC}
          />
        }
        footer={<BiotechFooter />}
      >
        <Component />
      </BasicLayout>
    </>
  );
}
