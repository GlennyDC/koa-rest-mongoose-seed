import mongoose from 'mongoose';

interface Author extends mongoose.Document {
  id: string;
  name: string;
  age: number;
  bookIds: string[];
}

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  bookIds: [{ type: String, required: true }],
});

const authorModel = mongoose.model<Author>('Author', authorSchema);

export { authorModel as db };
