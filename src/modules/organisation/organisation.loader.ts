import DataLoader from 'dataloader';

import { ErrorCode, NotFoundError } from '../../global';
import { Organisation } from './organisation';
import { getOrganisationsByIds } from './organisation.service';

const loaderFn = async (
  keys: readonly string[],
): Promise<(Organisation | NotFoundError)[]> => {
  // TODO
  // eslint-disable-next-line
  // @ts-ignore
  const organisations = await getOrganisationsByIds(keys);

  const organisationMap = new Map<string, Organisation>();
  organisations.forEach((organisation) =>
    organisationMap.set(organisation.id, organisation),
  );

  return keys.map(
    (key) =>
      organisationMap.get(key) ||
      new NotFoundError(
        `Organisation [${key}] not found`,
        ErrorCode.ORGANISATION_NOT_FOUND,
      ),
  );
};

export type OrganisationLoader = DataLoader<string, Organisation>;

export const createOrganisationLoader = (): OrganisationLoader =>
  new DataLoader<string, Organisation>(loaderFn);
