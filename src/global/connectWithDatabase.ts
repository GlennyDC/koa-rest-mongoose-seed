import mongoose from 'mongoose';
import type { Logger } from 'winston';

export const connectWithDatabase = async (
  logger: Logger,
): Promise<mongoose.Mongoose> => {
  logger.info('Connect with database');
  try {
    // Make sure that Mongoose doesn't use deprecated
    // MongoDb Node.js driver functions.
    const mongooseInstance = await mongoose.connect('mongodb://db:27017', {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    // Change the default returnOriginal option of findOneAndUpdate(),
    // findByIdAndUpdate(), and findOneAndReplace() to false. This makes
    // sure that the returned value will be the modified document after
    // the update and not the original document before the update.
    mongooseInstance.set('returnOriginal', false);

    // This should work, but it doesn't...
    // https://github.com/Automattic/mongoose/issues/6912
    // mongoose.ObjectId.get((v) => v.toString());

    return mongooseInstance;
  } catch (err) {
    logger.error('Could not connect with database', err);
    throw err;
  }
};
