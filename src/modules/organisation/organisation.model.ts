import * as mongoose from 'mongoose';

interface OrganisationDocument extends mongoose.Document {
  id: string;
  ownerId: string;
  name: string;
}

const organisationSchema = new mongoose.Schema(
  {
    ownerId: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
  },
  { timestamps: true },
);

export const OrganisationModel = mongoose.model<OrganisationDocument>(
  'Organisation',
  organisationSchema,
);
