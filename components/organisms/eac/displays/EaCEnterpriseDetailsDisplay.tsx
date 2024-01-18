import { EaCEnterpriseDetails } from "@fathym/eac";

export function EaCEnterpriseDetailsDisplay(details: EaCEnterpriseDetails) {
  return (
    <div>
      <h1>{details.Name}</h1>

      <p>{details.Description}</p>
    </div>
  );
}
