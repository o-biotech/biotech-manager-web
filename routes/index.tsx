import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";
import { IconStyleTypes } from "$atomic/atoms/icons/Icon.tsx";
import { UserIcon } from "$atomic/atoms/icons/UserIcon.tsx";

export default function Home() {
  const count = useSignal(3);
  return (
    <>
      <div class="p-4 mx-auto max-w-screen-md">
        <img
          src="/logo.svg"
          class="w-32 h-32"
          alt="the fresh logo: a sliced lemon dripping with juice"
        />

        <p class="my-6">
          Open innovation for your BioTech projects with Fathym State Flow
          technology.
        </p>

        <Counter count={count} />
      </div>
    </>
  );
}
