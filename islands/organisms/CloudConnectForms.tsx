import { JSX } from "preact";
import { useState } from "preact/hooks";
import { Action, ActionGroup, ActionStyleTypes } from "@fathym/atomic";
import CloudConnectExistingForm from "../../components/organisms/cloud/connect/existing.form.tsx";
import CloudConnectManagedForm from "../../components/organisms/cloud/connect/managed.form.tsx";

export default function CloudConnectForms(
  props: JSX.HTMLAttributes<HTMLFormElement>,
) {
  const [isManaged, setIsManaged] = useState(true);

  const switchOnClick = () => {
    setIsManaged(!isManaged);
  };

  return (
    <div class="flex flex-col justify-center">
      {isManaged
        ? <CloudConnectManagedForm {...props} />
        : <CloudConnectExistingForm {...props} />}

      <ActionGroup class="flex justify-center">
        <>
          <Action
            onClick={switchOnClick}
            class="m-2"
            actionStyle={ActionStyleTypes.Outline | ActionStyleTypes.Rounded}
          >
            {isManaged ? "Switch to Existing" : "Switch to Managed"}
          </Action>
        </>
      </ActionGroup>
    </div>
  );
}
