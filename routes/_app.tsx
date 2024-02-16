import { Head } from "$fresh/runtime.ts";
import { BasicLayout } from "@fathym/atomic";

import { PageProps } from "$fresh/server.ts";
import { BiotechHeader } from "../components/organisms/BiotechHeader.tsx";
import { BiotechFooter } from "../components/organisms/BiotechFooter.tsx";
import { OpenBiotechManagerState } from "../src/OpenBiotechManagerState.tsx";
import Theme from "../islands/atoms/Theme.tsx";
import SideBar, { SideBarMenuItem } from "../islands/molecules/SideBar.tsx";
import { loadOoenBiotechSideBarMenuItems } from "../src/eac/loadOpenBiotechSideBarMenuItems.tsx";

export default function App(
  // deno-lint-ignore no-explicit-any
  { Component, url, state }: PageProps<any, OpenBiotechManagerState>,
) {
  const menuItems = loadOoenBiotechSideBarMenuItems(state);

  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title>Fathym Open Biotech</title>

        <link rel="icon" type="image/png" href="./thinky.png" />
        <link rel="stylesheet" href="/styles.css" />
        {/* TODO: Open something in issues with fresh that allow this to be added to the head */}
        <Theme />
      </head>

      <body class="bg-slate-50 dark:bg-slate-900 text-black dark:text-white">
        <BasicLayout
          class="min-h-[100vh]"
          header={
            <BiotechHeader
              class="h-[64px]"
              currentUrl={url}
              setupPhase={state.Phase}
              hasDevelop={!!state.Cloud?.CloudLookup &&
                !!state.Cloud?.ResourceGroupLookup}
              hasEaC={!!state.EaC}
              username={state.Username}
            />
          }
          footer={<BiotechFooter />}
        >
          <SideBar
            class="top-[64px] left-0"
            menuItems={menuItems}
            state={state}
            // disableToggle={true}
          >
            <Component />
          </SideBar>
        </BasicLayout>
      </body>
    </html>
  );
}
