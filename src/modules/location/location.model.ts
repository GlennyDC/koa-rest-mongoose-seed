import mongoose from 'mongoose';

interface LocationDocument extends mongoose.Document {
  id: string;
  organisationId: string;
  name: string;
}

const locationSchema = new mongoose.Schema(
  {
    organisationId: {
      type: mongoose.Schema.Types.ObjectId,
      get: (v: mongoose.Schema.Types.ObjectId): string => v.toString(),
      required: true,
    },
    name: { type: String, required: true },
  },
  { timestamps: true },
);

export const LocationModel = mongoose.model<LocationDocument>(
  'Location',
  locationSchema,
);
