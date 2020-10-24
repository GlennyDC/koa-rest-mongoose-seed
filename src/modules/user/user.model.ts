import mongoose from 'mongoose';

interface UserDocument extends mongoose.Document {
  emailAddress: string;
  password: string;
  roles: string[];
  createdAt: Date;
  badLoginAttempts: number;
  lastBadLoginAttempt: Date;
}

const userSchema = new mongoose.Schema({
  emailAddress: { type: String, required: true },
  password: { type: String, required: true },
  roles: [{ type: String, required: true }],
  createdAt: { type: Date, default: Date.now },
  badLoginAttempts: { type: Number, required: true, default: 0 },
  lastBadLoginAttempt: { type: Date, default: null },
});

export const UserModel = mongoose.model<UserDocument>('User', userSchema);
