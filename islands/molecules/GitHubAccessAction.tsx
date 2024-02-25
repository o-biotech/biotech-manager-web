import { useEffect, useState } from "preact/hooks";
import {
  Action,
  ActionProps,
  ActionStyleTypes,
  classSet,
} from "@fathym/atomic";
import { callToActionStyles } from "../../components/styles/actions.tsx";

export function GitHubAccessAction(props: ActionProps) {
  const [signInHref, setSignInHref] = useState("");

  useEffect(() => {
    const successUrl = encodeURI(location.href);

    const href = `/github/access/signin?success_url=${successUrl}`;

    setSignInHref(href);
  }, []);

  return (
    <Action
      actionStyle={ActionStyleTypes.Outline | ActionStyleTypes.Link}
      {...props}
      href={signInHref}
      class={classSet(
        [
          "w-full md:w-auto text-white text-xs font-bold m-1 py-1 px-2 rounded focus:outline-none shadow-lg",
        ],
        callToActionStyles.props,
      )}
    />
  );
}
