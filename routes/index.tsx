import { Head } from "$fresh/runtime.ts";
import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";
import { Action } from "$atomic/atoms/Action.tsx";
import { Header } from "$atomic/organisms/Header.tsx";

export default function Home() {
  const count = useSignal(3);
  return (
    <>
      <Head>
        <title>Fathym Open BioTech</title>
      </Head>

      <Header
        logo={
          <Action>
            <img
              src="/logo.svg"
              class="w-32 h-32"
              alt="the fresh logo: a sliced lemon dripping with juice"
            />
          </Action>
        }
      />

      <div class="p-4 mx-auto max-w-screen-md">
        <img
          src="/logo.svg"
          class="w-32 h-32"
          alt="the fresh logo: a sliced lemon dripping with juice"
        />

        <p class="my-6">
          Welcome to `fresh`. Try updating this message in the
          ./routes/index.tsx file, and refresh.
        </p>

        <Counter count={count} />
      </div>
    </>
  );
}
