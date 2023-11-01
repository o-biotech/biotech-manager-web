import { Handlers, PageProps } from "$fresh/server.ts";
import { WithSession } from "$fresh/session";

interface TestPageData {
  hello: string;
}

export const handler: Handlers<TestPageData, WithSession> = {
  GET(_, ctx) {
    const data: TestPageData = {
      hello: ctx.state.session.get("hello"),
    };

    return ctx.render(data);
  },
};

export default function Test(
  { data }: PageProps<TestPageData>,
) {
  return (
    <h1>
      {data.hello || "not found"}
    </h1>
  );
}
