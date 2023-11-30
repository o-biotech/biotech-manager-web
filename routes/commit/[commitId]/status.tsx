// deno-lint-ignore-file no-explicit-any
import { Handlers, PageProps } from "$fresh/server.ts";
import { redirectRequest } from "@fathym/common";
import { EaCStatus, EaCStatusProcessingTypes } from "@fathym/eac";
import { formatDistanceToNow, intlFormatDistance } from "npm:date-fns";
import { OpenBiotechManagerState } from "../../../src/OpenBiotechManagerState.tsx";
import { eacSvc } from "../../../services/eac.ts";
import { Redirect } from "../../../islands/atoms/Redirect.tsx";
import { CheckIcon, ErrorIcon, RenewIcon } from "$fathym/atomic-icons";

interface CommitStatusPageData {
  complete: boolean;

  redirect: string;

  status: EaCStatus;
}

export const handler: Handlers<
  CommitStatusPageData | null,
  OpenBiotechManagerState
> = {
  async GET(req, ctx) {
    const entLookup = ctx.state.EaC!.EnterpriseLookup!;

    const commitId: string = ctx.params.commitId;

    const url = new URL(req.url);

    const status: EaCStatus = await eacSvc.Status(entLookup, commitId);

    const complete = (url.searchParams.get("complete") as string) === "true";

    const successRedirect = url.searchParams.get("successRedirect") as string;

    const errorRedirect = url.searchParams.get("errorRedirect") as string;

    if (complete) {
      return redirectRequest(successRedirect);
    } else if (status.Processing === EaCStatusProcessingTypes.ERROR) {
      return redirectRequest(`${errorRedirect}?commitId=${commitId}`);
    } else {
      const data: CommitStatusPageData = {
        complete: status.Processing === EaCStatusProcessingTypes.COMPLETE,
        redirect:
          `/commit/${commitId}/status?successRedirect=${successRedirect}&errorRedirect=${errorRedirect}&complete=${
            status.Processing === EaCStatusProcessingTypes.COMPLETE
          }`,
        status,
      };

      return ctx.render(data);
    }
  },
};

export default function CommitStatus({
  data,
}: PageProps<CommitStatusPageData | null, OpenBiotechManagerState>) {
  const start = intlFormatDistance(
    new Date(data!.status.StartTime),
    new Date(),
  );

  const interval = data!.complete
    ? 30000
    : Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000;

  const classyPrint = (key: string, data: any, level: number) => {
    if (typeof data === "object") {
      const statusIcon = data.State === "Succeeded"
        ? <CheckIcon class="w-6 h-6 text-green-500 inline-block" />
        : data.State === "Error"
        ? <ErrorIcon class="w-6 h-6 text-red-500 inline-block" />
        : <RenewIcon class="w-6 h-6 text-blue-500 animate-spin inline-block" />;
      return (
        <details
          open={data.State !== "Succeeded"}
          class={`text-lg my-2 mt-3 ml-${2 * level}`}
        >
          <summary class="font-bold">
            {statusIcon}
            {key}
          </summary>

          {Object.keys(data).map((k) => {
            return classyPrint(
              k,
              data[k] as Record<string, unknown>,
              level + 1,
            );
          })}
        </details>
      );
    } else {
      if (!isNaN(new Date(data).getTime())) {
        const date = new Date(data);

        data = `${
          intlFormatDistance(
            date,
            new Date(),
          )
        } (${date.toLocaleString()})`;
      }
      return (
        <div class={`text-lg my-2 ml-${2 * level}`}>
          <span class="font-bold">{key}:</span> {data}
        </div>
      );
    }
  };

  return (
    <div class="m-4">
      <p class="text-lg my-2">
        <span class="font-bold">Started by:</span> {data!.status.Username}
      </p>

      <p class="text-lg my-2">
        <span class="font-bold">Status:</span>{" "}
        {EaCStatusProcessingTypes[data!.status.Processing]}
        {data!.complete
          ? <CheckIcon class="w-6 h-6 text-green-500 inline-block ml-4" />
          : (
            <RenewIcon class="w-6 h-6 text-blue-500 animate-spin inline-block ml-4" />
          )}
      </p>

      <p class="text-lg my-2">
        <span class="font-bold">Processing since:</span> {start}
      </p>

      <p class="text-lg my-2">
        <span class="font-bold">Started At:</span>{" "}
        {new Date(data!.status.StartTime).toLocaleString("en-US")}
      </p>

      <p class="text-lg my-2">
        <span class="font-bold">Commit ID:</span> {data!.status.ID}
      </p>

      <div open class="text-2xl my-2 mt-6">
        <span class="font-bold">Messages</span>

        {data!.complete && (
          <p class="text-lg my-2">
            <span class="font-bold">Complete:</span> Redirecting in 30 seconds,
            {" "}
            <a href={data!.redirect} class="text-blue-500 underline">
              click here
            </a>{" "}
            to redirect now.
          </p>
        )}

        {Object.keys(data!.status.Messages || {}).map((messageKey) => {
          return classyPrint(messageKey, data!.status.Messages[messageKey], 1);
        })}
      </div>

      <Redirect interval={interval} redirect={data!.redirect} />
    </div>
  );
}
