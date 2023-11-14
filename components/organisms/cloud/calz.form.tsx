import { JSX } from "preact";
import { Action, ActionGroup, classSet, Input } from "@fathym/atomic";
import { Location } from "npm:@azure/arm-subscriptions";
import { callToActionStyles } from "../../styles/actions.tsx";

export type CloudCALZFormProps = JSX.HTMLAttributes<HTMLFormElement> & {
  cloudLookup: string;

  locations: Location[];

  resGroupLookup?: string;
};

export default function CloudCALZForm(props: CloudCALZFormProps) {
  return (
    <form
      method="post"
      action="/api/eac/clouds/resource-groups"
      {...props}
      class={classSet(props, "w-full max-w-sm md:max-w-md mx-auto p-3 mt-8")}
    >
      <div class="flex flex-wrap -mx-3 mb-4 text-left">
        <Input
          id="cloudLookup"
          name="cloudLookup"
          type="hidden"
          value={props.cloudLookup}
        />

        <div class="w-full px-3">
          <label
            for="resGroupLookup"
            class="block uppercase tracking-wide font-bold mb-2 text-xl"
          >
            Resource Group Lookup
          </label>

          <Input
            id="resGroupLookup"
            name="resGroupLookup"
            type="text"
            required
            disabled={!!props.resGroupLookup}
            placeholder="Enter new resource group lookup"
            class="appearance-none block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded leading-tight focus:outline-none focus:border-blue-500"
          />
        </div>

        <div class="w-full p-3">
          <label
            for="description"
            class="block uppercase tracking-wide font-bold mb-2 text-xl"
          >
            Description
          </label>

          <Input
            id="description"
            name="description"
            type="text"
            required
            multiline
            placeholder="Enter new resource group description"
            class="appearance-none block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded leading-tight focus:outline-none focus:border-blue-500"
          />
        </div>

        <div class="w-full px-3">
          <label
            for="location"
            class="block uppercase tracking-wide font-bold mb-2 text-xl"
          >
            Location
          </label>

          <select
            id="location"
            name="location"
            required
            class="appearance-none block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:shadow-lg focus:border-blue-500 placeholder-gray-500"
          >
            <option value="">-- Select a location --</option>

            {props.locations.map((location) => {
              return (
                <option value={location.name}>
                  {location.displayName}
                </option>
              );
            })}
          </select>
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
            Create CALZ
          </Action>
        </>
      </ActionGroup>
    </form>
  );
}
