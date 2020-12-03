export interface Organisation {
  id: string;
  ownerId: string;
  name: string;
}

export type CreateOrganisationInput = Omit<Organisation, 'id' | 'ownerId'>;

export type UpdateOrganisationInput = Partial<CreateOrganisationInput>;
