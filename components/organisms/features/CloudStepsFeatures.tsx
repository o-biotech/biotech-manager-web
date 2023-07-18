import { ComponentChildren } from "preact";
import { Action, ActionStyleTypes } from "$atomic/atoms/Action.tsx";
import { ActionGroup } from "$atomic/molecules/ActionGroup.tsx";
import { DisplayStyleTypes } from "$atomic/molecules/Display.tsx";
import { Features, FeaturesProps } from "$atomic/organisms/Features.tsx";
import { CloudPhaseTypes } from "../../CloudPhaseTypes.tsx";
import { buildTitle } from "./BiotechStepsFeatures.tsx";

export interface CloudStepsFeaturesProps extends FeaturesProps {
  cloudPhase?: CloudPhaseTypes;
}

export default function CloudStepsFeatures(props: CloudStepsFeaturesProps) {
  const connectComplete: boolean = props.cloudPhase as number > 0;

  const calzComplete: boolean = props.cloudPhase as number > 1;

  const iotComplete: boolean = props.cloudPhase as number > 2;

  return (
    <Features
      class="m-2 md:m-8"
      {...props}
    >
      {[{
        title: buildTitle(1, "Connect to Azure", connectComplete === true),
        class: "shadow-lg p-4 m-4 justify-start sm:(p-1 m-1)",
        displayStyle: DisplayStyleTypes.Center,
        children: (
          <>
            <p class="m-2">
              Bring your own Azure Cloud connection or get started with a Fathym
              Managed Azure Subscription.
            </p>

            {props.cloudPhase === CloudPhaseTypes.Connect &&
              (
                <ActionGroup class="[&>*]:mx-1 my-2 mt-8">
                  <>
                    <Action href="./cloud/connect/managed" class="m-2">
                      Managed Subscription
                    </Action>

                    <Action
                      href="./cloud/connect/existing"
                      class="m-2"
                      actionStyle={ActionStyleTypes.Link |
                        ActionStyleTypes.Outline | ActionStyleTypes.Rounded}
                    >
                      Connect Existing
                    </Action>
                  </>
                </ActionGroup>
              )}
          </>
        ),
      }, {
        title: buildTitle(2, "Cloud Landing Zone", calzComplete === true),
        class: "shadow-lg p-4 m-4 justify-start sm:(p-1 m-1)",
        displayStyle: DisplayStyleTypes.Center,
        children: (
          <>
            <p class="m-2">
              Deploy Fathym's Composable Application Landing Zone to prepare
              your cloud for devices and applications.
            </p>

            {props.cloudPhase === CloudPhaseTypes.CALZ &&
              (
                <ActionGroup class="[&>*]:mx-1 my-2 mt-8">
                  <>
                    <Action href="./cloud/calz" class="m-2">
                      Configure CALZ
                    </Action>
                  </>
                </ActionGroup>
              )}
          </>
        ),
      }, {
        title: buildTitle(
          3,
          "IoT Infrastructure",
          iotComplete === true,
        ),
        class: "shadow-lg p-4 m-4 justify-start sm:(p-1 m-1)",
        displayStyle: DisplayStyleTypes.Center,
        children: (
          <>
            <p class="m-2">
              Establish the foundation of your IoT infrastructure for the
              creation of device flows and data access.
            </p>

            {props.cloudPhase === CloudPhaseTypes.Infrastucture &&
              (
                <ActionGroup class="[&>*]:mx-1 my-2 mt-8">
                  <>
                    <Action href="./cloud/iot">Setup IoT</Action>
                  </>
                </ActionGroup>
              )}
          </>
        ),
      }]}
    </Features>
  );
}
