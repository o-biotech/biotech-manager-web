import { Head } from '$fresh/runtime.ts';
import { BasicLayout } from '@fathym/atomic';

import { PageProps } from '$fresh/server.ts';
import { BiotechHeader } from '../components/organisms/BiotechHeader.tsx';
import { BiotechFooter } from '../components/organisms/BiotechFooter.tsx';
import { OpenBiotechManagerState } from '../src/OpenBiotechManagerState.tsx';
import Theme from '../islands/atoms/Theme.tsx';
import SideBar, { SideBarMenuItem } from '../islands/molecules/SideBar.tsx';
import { loadOoenBiotechSideBarMenuItems } from '../src/eac/loadOpenBiotechSideBarMenuItems.tsx';

export default function App(
  // deno-lint-ignore no-explicit-any
  { Component, url, state }: PageProps<any, OpenBiotechManagerState>
) {
  const menuItems = loadOoenBiotechSideBarMenuItems(state);

  return (
    <>
      <Head>
        <title>Fathym Open Biotech</title>

        <link rel="icon" type="image/png" href="./thinky.png" />
        <link rel="stylesheet" href="/styles.css" />
      </Head>

      {/* TODO: Open something in issues with fresh that allow this to be added to the head */}
      <Theme />

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
        <SideBar
          class="top-[68px] left-0"
          menuItems={menuItems}
          state={state}
        />

        <div class="ml-12">
          <Component />
        </div>
      </BasicLayout>
    </>
  );
}
