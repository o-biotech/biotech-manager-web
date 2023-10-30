import { JSX } from "preact";
import { useState } from "preact/hooks";
import CloudConnectExistingForm from "./connect/existing.form.tsx";
import CloudConnectAzureForm from "./connect/azure.form.tsx";
import CloudConnectForms from "../../../islands/organisms/CloudConnectForms.tsx";

export type ConnectAzureProps = JSX.HTMLAttributes<HTMLFormElement> & {
  isConnected: boolean;
};

export default function ConnectAzure(
  props: ConnectAzureProps,
) {
  return (
    <div class="flex flex-col justify-center">
      {!props.isConnected
        ? <CloudConnectAzureForm {...props}></CloudConnectAzureForm>
        : <CloudConnectForms class="px-4" />}
    </div>
  );
}
