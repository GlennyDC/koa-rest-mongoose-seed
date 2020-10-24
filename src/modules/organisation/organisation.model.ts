import mongoose from 'mongoose';

interface OrganisationDocument extends mongoose.Document {
  id: string;
  name: string;
}

const organisationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true },
);

export const OrganisationModel = mongoose.model<OrganisationDocument>(
  'Organisation',
  organisationSchema,
);
