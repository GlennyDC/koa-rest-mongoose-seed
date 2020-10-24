import mongoose from 'mongoose';

/**
 * Make sure that Mongoose doesn't use deprecated
 * MongoDb Node.js driver functions.
 */
export const installDatabaseConnection = async (): Promise<void> => {
  try {
    await mongoose.connect('mongodb://db:27017', {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    // Change the default returnOriginal option of findOneAndUpdate(),
    // findByIdAndUpdate(), and findOneAndReplace() to false. This makes
    // sure that the returned value will be the modified document after
    // the update and not the original document before the update.
    mongoose.set('returnOriginal', false);
  } catch (err) {
    console.log(err);
  }
};
