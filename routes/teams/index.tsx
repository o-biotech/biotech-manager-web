import { JSX } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { OpenBiotechManagerState } from "../../src/OpenBiotechManagerState.tsx";
import {
  Display,
  DisplayStyleTypes,
  Hero,
  HeroStyleTypes,
} from "@fathym/atomic";
import { loadJwtConfig } from "@fathym/eac";
import { APIDevelopForm } from "../../islands/organisms/data/api-develop-form.tsx";
import { InviteTeamMemberForm } from "../../islands/organisms/team/invite-team-member.tsx";
import { loadEaCSvc } from "../../configs/eac.ts";

interface TeamsPageData {
  members: string[];
}

export const handler: Handlers<TeamsPageData | null, OpenBiotechManagerState> =
  {
    async GET(_, ctx) {
      const eacSvc = await loadEaCSvc(ctx.state.EaCJWT!);

      const users = await eacSvc.ListUsers(ctx.state.EaC!.EnterpriseLookup!);

      const data: TeamsPageData = {
        members: users.map((user) => user.Username),
      };

      return ctx.render(data);
    },
  };

export default function Teams({
  data,
  state,
}: PageProps<TeamsPageData, OpenBiotechManagerState>) {
  return (
    <>
      <Hero
        title="Manage Enterprise Teams"
        class="[&_*]:mx-auto [&>*>*]:w-full bg-hero-pattern text-center"
        heroStyle={HeroStyleTypes.None}
        displayStyle={DisplayStyleTypes.Center | DisplayStyleTypes.Large}
      >
      </Hero>

      <div class="flex flex-col md:flex-row gap-4 my-8 mx-4">
        {
          /* <Display class="flex-1 p-2 bg-slate-50 dark:bg-slate-800 shadow-slate-500 dark:shadow-black">
        </Display> */
        }

        <Display class="flex-1 p-2 bg-slate-50 dark:bg-slate-800 shadow-slate-500 dark:shadow-black">
          <h2 class="text-xl">Invite Team Member</h2>

          <InviteTeamMemberForm />
        </Display>

        <Display class="flex-1 p-2 bg-slate-50 dark:bg-slate-800 shadow-slate-500 dark:shadow-black">
          <h2 class="text-xl">Existing Users</h2>

          <pre>{JSON.stringify(data.members, null, 2)}</pre>
        </Display>
      </div>
    </>
  );
}