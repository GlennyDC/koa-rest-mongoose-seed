import DataLoader from 'dataloader';

import { Location } from './location';
import { getLocationsByIds } from './location.service';

const loaderFn = async (
  keys: readonly string[],
): Promise<(Location | Error)[]> => {
  // eslint-disable-next-line
  // @ts-ignore
  const locations = await getLocationsByIds(keys);

  const locationMap = new Map<string, Location>();
  locations.forEach((location) => locationMap.set(location.id, location));

  return keys.map(
    (key) => locationMap.get(key) || new Error(`No result for key [${key}]`),
  );
};

export type LocationLoader = DataLoader<string, Location>;

export const createLocationLoader = (): LocationLoader =>
  new DataLoader<string, Location>(loaderFn);
