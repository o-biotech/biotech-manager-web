import { JSX } from "preact";
import { useRef, useState } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { Action, ActionGroup, classSet, Input } from "@fathym/atomic";
import { RenewIcon } from "$fathym/atomic-icons";
import { callToActionStyles } from "../../../components/styles/actions.tsx";

export type DataExploreFormProps = {
  dashboardTypes: string[];

  jwt: string;

  kustoCluster: string;

  kustoLocation: string;
} & JSX.HTMLAttributes<HTMLFormElement>;

export function DataExploreForm(props: DataExploreFormProps) {
  if (!IS_BROWSER) return <></>;

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [isLoaded, setIsLoaded] = useState(false);

  if (props.dashboardTypes.includes("AzureDataExplorer")) {
    const mapScope = (scope: string) => {
      switch (scope) {
        case "query":
          return ["https://kwetest.eastus.kusto.windows.net/.default"];
        case "People.Read":
          return ["People.Read", "User.ReadBasic.All", "Group.Read.All"];
        default:
          return [scope];
      }
    };

    const postToken = (accessToken: string, scope: string) => {
      console.log(
        `[postToken] scope: ${scope}, message length(accesstoken): ${accessToken.length}`,
      );

      setIsLoaded(true);

      iframeRef.current?.contentWindow?.postMessage(
        {
          type: "postToken",
          message: accessToken,
          scope: scope,
        },
        "*", // Not secure
      );
    };

    const getAuthToken = async (scope: string): Promise<void> => {
      const aadScopes = mapScope(scope);

      const dataUrl = `${location.origin}/api/data/clouds/auth-token?scope=${
        aadScopes.join(",")
      }`;

      const response = await fetch(dataUrl, {
        headers: {
          Authorization: `Bearer ${props.jwt}`,
        },
      });

      const data = await response.json();

      console.log(data);

      postToken(data.Token, scope);
    };

    self.addEventListener("message", (event) => {
      console.log(event.data.type);
      if (
        event.data.signature === "queryExplorer" &&
        event.data.type === "getToken"
      ) {
        getAuthToken(event.data.scope).then();
      }
    });
  }

  const kustoQuery = props.dashboardTypes.includes("AzureDataExplorer")
    ? `https://dataexplorer.azure.com/clusters/${props.kustoCluster}.${props.kustoLocation}/databases/Telemetry?f-IFrameAuth=true&f-UseMeControl=false&workspace=<guid>`
    : null;

  const kustoIframe = kustoQuery && (
    <>
      {!isLoaded && (
        <RenewIcon class="w-20 h-20 text-blue-500 animate-spin inline-block m-4" />
      )}

      <iframe
        class="w-full h-[600px]"
        ref={iframeRef}
        src={kustoQuery}
      >
      </iframe>
    </>
  );

  return (
    <form
      method="post"
      action="/api/eac/data/explore"
      {...props}
      class={classSet(props, "w-full mx-auto p-3 mt-8")}
    >
      <div class="flex flex-wrap -mx-3 mb-4 text-left">
        <div class="w-full p-3">
          <Input id="explored" name="explored" type="hidden" value="true" />

          <label class="block uppercase tracking-wide font-bold mb-2 text-xl">
            Explore Data
          </label>

          <p class="block text-md mb-8">
            Now that data is flowing, the next step is to explore the dashboards
            you configured previously, or skip ahead to see what other
            development you can implement with your data.
          </p>

          <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
            <li class="me-2">
              <a
                href="#"
                aria-current="page"
                class="inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
              >
                Azure Data Explorer
              </a>
            </li>
            {
              /* <li class="me-2">
              <a
                href="#"
                class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
              >
                Dashboard
              </a>
            </li> */
            }
          </ul>

          {kustoIframe}
        </div>
      </div>

      <ActionGroup class="mt-8 flex-col">
        <>
          <Action
            type="submit"
            class={classSet(
              callToActionStyles.props,
              "w-full md:w-auto text-white font-bold m-1 py-2 px-4 rounded focus:outline-none shadow-lg",
            )}
          >
            Move to Develop Solutions
          </Action>
        </>
      </ActionGroup>
    </form>
  );
}
