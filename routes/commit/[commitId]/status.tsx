// deno-lint-ignore-file no-explicit-any
import { Handlers, PageProps } from "$fresh/server.ts";
import { redirectRequest } from "@fathym/common";
import { EaCStatus, EaCStatusProcessingTypes } from "@fathym/eac";
import { formatDistanceToNow, intlFormatDistance } from "npm:date-fns";
import {
  MdAutoMode,
  MdAutorenew,
  MdCheckCircle,
  MdError,
} from "react-icons/md";
import { OpenBiotechManagerState } from "../../../src/OpenBiotechManagerState.tsx";
import { eacSvc } from "../../../services/eac.ts";
import { Redirect } from "../../../islands/atoms/Redirect.tsx";

interface CommitStatusPageData {
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

    if (status.Processing === EaCStatusProcessingTypes.COMPLETE) {
      const successRedirect = url.searchParams.get("successRedirect") as string;

      return redirectRequest(successRedirect);
    } else if (status.Processing === EaCStatusProcessingTypes.ERROR) {
      const errorRedirect = url.searchParams.get("errorRedirect") as string;

      return redirectRequest(`${errorRedirect}?commitId=${commitId}`);
    } else {
      const data: CommitStatusPageData = {
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

  const interval = Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000;

  const classyPrint = (key: string, data: any, level: number) => {
    if (typeof data === "object") {
      const statusIcon = data.State === "Succeeded"
        ? <MdCheckCircle class="color-green-500 inline-block" />
        : data.State === "Error"
        ? <MdError class="color-red-500 inline-block" />
        : <MdAutorenew class="color-blue-500 animate-spin inline-block" />;
      return (
        <details
          open={data.State !== "Succeeded"}
          class={`text-lg my-2 mt-3 ml-${2 * level}`}
        >
          <summary class="font-bold">
            {statusIcon}
            {key}:
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
        <MdAutoMode class="text-2xl animate-spin inline-block ml-4" />
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
        <span class="font-bold">Messages:</span>

        {Object.keys(data!.status.Messages || {}).map((messageKey) => {
          return classyPrint(messageKey, data!.status.Messages[messageKey], 1);
          // return (
          //   <p class="text-lg my-2">
          //     <span class="font-bold">{messageKey}:</span> <pre>
          //       {JSON.stringify(data!.status.Messages[messageKey], null, 2)}
          //     </pre>
          //   </p>
          // );
        })}
      </div>

      <Redirect interval={interval} />
    </div>
  );
}
