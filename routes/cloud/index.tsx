import { Handlers, PageProps } from "$fresh/server.ts";
import { Action } from "$atomic/atoms/Action.tsx";
import { DisplayStyleTypes } from "$atomic/molecules/Display.tsx";
import { Hero, HeroStyleTypes } from "$atomic/organisms/Hero.tsx";
import { ChevronRightIcon } from "$atomic/atoms/icons/ChevronRightIcon.tsx";
import { IconStyleTypes } from "$atomic/atoms/icons/Icon.tsx";
import CloudConnectHero from "../../components/organisms/heros/CloudConnectHero.tsx";

interface CloudPageData {
  hasCloud: boolean;
}

export const handler: Handlers<CloudPageData | null> = {
  async GET(_, ctx) {
    // const {} = ctx.params;

    // const resp = await fetch(`https://api.github.com/users/${username}`);
    // if (resp.status === 404) {
    //   return ctx.render(null);
    // }

    const data: CloudPageData = {
      hasCloud: true,
    };

    return ctx.render(data);
  },
};

export default function Cloud({ data }: PageProps<CloudPageData | null>) {
  return (
    <div>
      <CloudConnectHero />
    </div>
  );
}
