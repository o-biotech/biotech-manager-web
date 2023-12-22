import { JSX } from "preact";
import * as ArmResource from "npm:@azure/arm-subscriptions";
import { CloudConnectForm } from "@fathym/atomic";

export type CloudConnectFormsProps = JSX.HTMLAttributes<HTMLFormElement> & {
  subs: ArmResource.Subscription[];
};

export function CloudConnectForms(
  props: CloudConnectFormsProps,
) {
  // const [isManaged, setIsManaged] = useState(false);

  // const switchOnClick = () => {
  //   setIsManaged(!isManaged);
  // };

  return (
    <div class="flex flex-col justify-center">
      <CloudConnectForm {...props} />
      {
        /* {isManaged
        ? <CloudConnectManagedForm {...props} />
        : <CloudConnectExistingForm {...props} />} */
      }

      {
        /* <ActionGroup class="flex justify-center">
        <>
          <Action
            onClick={switchOnClick}
            class="m-2"
            actionStyle={ActionStyleTypes.Outline | ActionStyleTypes.Rounded}
          >
            {isManaged ? "Use Existing" : "Create Managed"}
          </Action>
        </>
      </ActionGroup> */
      }
    </div>
  );
}
