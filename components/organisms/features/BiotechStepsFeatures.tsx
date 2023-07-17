import { ComponentChildren } from "preact";
import { Action } from "$atomic/atoms/Action.tsx";
import { DisplayStyleTypes } from "$atomic/molecules/Display.tsx";
import { CheckIcon } from "$atomic/atoms/icons/CheckIcon.tsx";
import { ChevronRightIcon } from "$atomic/atoms/icons/ChevronRightIcon.tsx";
import { IconStyleTypes } from "$atomic/atoms/icons/Icon.tsx";
import { Features, FeaturesProps } from "$atomic/organisms/Features.tsx";
import { classSet } from "$atomic/utils/jsx.tsx";

export function buildTitle(
  step: number,
  title: ComponentChildren,
  complete: boolean,
): ComponentChildren {
  const textGradient = (
    <div
      class={classSet(
        undefined,
        complete
          ? "bg-gradient-to-tr from-green-500 to-blue-500/75"
          : "bg-gradient-to-tr from-blue-500 to-purple-500/75",
      )}
    >
    </div>
  );

  const circleGradient = (
    <div
      class={classSet(
        undefined,
        complete
          ? "bg-gradient-to-br from-green-500 to-blue-700/75 py-2"
          : "bg-gradient-to-br from-blue-500 to-purple-500/75",
      )}
    >
    </div>
  );

  return (
    <h1
      class={classSet(
        undefined,
        "text-2xl font-bold md:text-3xl inline-block my-4 bg-clip-text text-transparent",
        textGradient.props.class,
      )}
    >
      <span
        class={classSet(
          undefined,
          "rounded-full px-4 py-1 border(solid 1) m-2 shadow-lg text-white",
          circleGradient.props.class,
        )}
      >
        {complete ? "\u2713" : step}
      </span>

      {title}
    </h1>
  );
}

export interface BiotechStepsFeaturesProps extends FeaturesProps {
  applicationsComplete?: boolean;

  cloudComplete?: boolean;

  devicesComplete?: boolean;

  callToActionHref: string;

  callToActionText: string;

  showCallToAction?: boolean;
}

export default function BiotechStepsFeatures(props: BiotechStepsFeaturesProps) {
  return (
    <Features
      class="m-8"
      callToAction={props.showCallToAction && (
        <div class="flex justify-center">
          <Action
            href={props.callToActionHref}
            class="mx-4 md:m-8 text-2xl text-center shadow-lg mx-auto max-w-[60%] w-full bg-gradient-to-r from-blue-500 to-purple-500/75 hover:(bg-gradient-to-r from-purple-500 to-blue-500/75)"
          >
            <ChevronRightIcon
              iconStyle={IconStyleTypes.Outline}
              class="float-right mt-1"
            />

            {props.callToActionText}
          </Action>
        </div>
      )}
      {...props}
    >
      {[{
        title: buildTitle(1, "Connect to Cloud", props.cloudComplete === true),
        class: "shadow-lg p-4 m-4",
        displayStyle: DisplayStyleTypes.Center,
        children: (
          <p class="m-2">
            Bring your own Azure Cloud connection or get started with a Fathym
            Managed Azure Subscription.
          </p>
        ),
      }, {
        title: buildTitle(2, "Connect Devices", props.devicesComplete === true),
        class: "shadow-lg p-4 m-4",
        displayStyle: DisplayStyleTypes.Center,
        children: (
          <p class="m-2">
            Deploy your first device data flow and connect (or emulate) your
            first devices.
          </p>
        ),
      }, {
        title: buildTitle(
          3,
          "Create Applications",
          props.applicationsComplete === true,
        ),
        class: "shadow-lg p-4 m-4",
        displayStyle: DisplayStyleTypes.Center,
        children: (
          <p class="m-2">
            Easily develop and securely share your data for collaboration and
            consumer products.
          </p>
        ),
      }]}
    </Features>
  );
}
