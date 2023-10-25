import { JSX } from "preact";
import { useState } from "preact/hooks";
import CloudConnectExistingForm from "../../components/organisms/cloud/connect/existing.form.tsx";
import CloudConnectAzureForm from "../../components/organisms/cloud/connect/azure.form.tsx";

export default function ConnectAzure(
  props: JSX.HTMLAttributes<HTMLFormElement>,
) {
  const [isConnected, setIsConnected] = useState(true);

  return (
    <div class="flex flex-col justify-center">
      {isConnected
        ? <CloudConnectAzureForm {...props}></CloudConnectAzureForm>
        : <CloudConnectExistingForm {...props} />}
    </div>
  );
}
