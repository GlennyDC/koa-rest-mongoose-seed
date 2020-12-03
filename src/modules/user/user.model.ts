import * as mongoose from 'mongoose';

interface UserDocument extends mongoose.Document {
  id: string;
  emailAddress: string;
  firstName: string;
  lastName: string;
  passwordHash: string;
  roles: string[];
  badLoginAttempts: number;
  lastBadLoginAttempt: Date;
}

const userSchema = new mongoose.Schema(
  {
    emailAddress: { type: String, required: true, index: { unique: true } },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    passwordHash: { type: String, required: true },
    roles: [{ type: String, required: true }],
    badLoginAttempts: { type: Number, required: true, default: 0 },
    lastBadLoginAttempt: { type: Date, default: null },
  },
  { timestamps: true },
);

export const UserModel = mongoose.model<UserDocument>('User', userSchema);
