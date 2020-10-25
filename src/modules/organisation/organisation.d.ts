export interface Organisation {
  id: string;
  ownerId: string;
  name: string;
}

export interface CreateOrganisationInput {
  name: string;
}
