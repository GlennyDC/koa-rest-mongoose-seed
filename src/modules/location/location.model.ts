import mongoose from 'mongoose';

interface LocationDocument extends mongoose.Document {
  id: string;
  organisationId: string;
  name: string;
}

const locationSchema = new mongoose.Schema(
  {
    organisationId: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
  },
  { timestamps: true },
);

export const LocationModel = mongoose.model<LocationDocument>(
  'Location',
  locationSchema,
);
