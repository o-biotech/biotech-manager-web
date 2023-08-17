import { Head } from "$fresh/runtime.ts";
import {
  Action,
  BasicLayout,
  classSet,
  factory,
  Footer,
  Header,
  HeaderLogo,
} from "@fathym/atomic";

import { AppProps } from "$fresh/server.ts";
import BiotechHeader from "../components/organisms/BiotechHeader.tsx";
import BiotechFooter from "../components/organisms/BiotechFooter.tsx";
import InteractiveResponsiveSet from "../islands/molecules/InteractiveResponsiveSet.tsx";
import ProfileMenu from "../islands/common/ProfileMenu.tsx";
import { ChevronDownIcon } from "../build/iconset/icons/ChevronDownIcon.tsx";
import { UserIcon } from "../build/iconset/icons/UserIcon.tsx";

export default function App({ Component }: AppProps) {
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
