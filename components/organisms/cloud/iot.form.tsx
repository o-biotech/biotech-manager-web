import { JSX } from 'preact';
import { Action, ActionGroup, classSet, Input } from '@fathym/atomic';
import * as ArmSubscriptions from 'npm:@azure/arm-subscriptions';
import { callToActionStyles } from '../../styles/actions.tsx';

export type CloudIoTFormProps = JSX.HTMLAttributes<HTMLFormElement> & {
  cloudLookup: string;

  locations: ArmSubscriptions.Location[];

  resGroupLookup: string;

  resLookup?: string;
};

export default function CloudIoTForm(props: CloudIoTFormProps) {
  return (
    <form
      method="post"
      action="/api/eac/clouds/iot-infrastructure"
      {...props}
      class={classSet(props, 'w-full max-w-sm md:max-w-md mx-auto p-3 mt-8')}
    >
      <div class="flex flex-wrap -mx-3 mb-4 text-left">
        <Input
          id="cloudLookup"
          name="cloudLookup"
          type="hidden"
          value={props.cloudLookup}
        />

        <Input
          id="resGroupLookup"
          name="resGroupLookup"
          type="hidden"
          value={props.resGroupLookup}
        />

        <Input
          id="resLookup"
          name="resLookup"
          type="hidden"
          value={props.resLookup}
        />

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

        <div class="w-full p-3">
          <label class="block uppercase tracking-wide font-bold mb-2 text-xl">
            Storage Flows
          </label>

          <div class="flex items-center mb-2">
            <Input
              id="storageFlowCold"
              name="storageFlowCold"
              type="checkbox"
              value="cold"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label for="storageFlowCold" class="ms-2 text-sm font-medium pl-3">
              Cold Storage
            </label>
          </div>

          <div class="flex items-center mb-2">
            <Input
              id="storageFlowWarm"
              name="storageFlowWarm"
              type="checkbox"
              value="warm"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label for="storageFlowWarm" class="ms-2 text-sm font-medium pl-3">
              Warm Storage
            </label>
          </div>

          <div class="flex items-center mb-2">
            <Input
              id="storageFlowHot"
              name="storageFlowHot"
              type="checkbox"
              value="hot"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label for="storageFlowHot" class="ms-2 text-sm font-medium pl-3">
              Hot Storage
            </label>
          </div>
        </div>
      </div>

      <ActionGroup class="mt-8 flex-col">
        <>
          <Action
            type="submit"
            class={classSet(
              callToActionStyles.props,
              'w-full md:w-auto text-white font-bold m-1 py-2 px-4 rounded focus:outline-none shadow-lg'
            )}
          >
            Establish IoT Infrastructure
          </Action>
        </>
      </ActionGroup>
    </form>
  );
}
