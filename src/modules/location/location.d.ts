export interface Location {
  id: string;
  organisationId: string;
  name: string;
}

export type CreateLocationInput = Omit<Location, 'id' | 'organisationId'>;
