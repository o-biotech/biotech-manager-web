import { JSX } from "preact";
import { useState } from "preact/hooks";
import * as ArmResource from "npm:@azure/arm-subscriptions";
import CloudConnectExistingForm from "./connect/existing.form.tsx";
import CloudConnectAzureForm from "./connect/azure.form.tsx";
import CloudConnectForms from "../../../islands/organisms/CloudConnectForms.tsx";

export type ConnectAzureProps = JSX.HTMLAttributes<HTMLFormElement> & {
  isConnected: boolean;

  subs: ArmResource.Subscription[];
};

export default function ConnectAzure(
  props: ConnectAzureProps,
) {
  return (
    <div class="flex flex-col justify-center">
      {!props.isConnected
        ? <CloudConnectAzureForm {...props}></CloudConnectAzureForm>
        : <CloudConnectForms {...props} class="px-4" />}
    </div>
  );
}
