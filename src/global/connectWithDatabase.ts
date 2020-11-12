import mongoose from 'mongoose';
import type { Logger } from 'winston';

export const connectWithDatabase = async (
  logger: Logger,
): Promise<mongoose.Mongoose> => {
  logger.info('Connect with database');
  try {
    const mongooseInstance = await mongoose.connect('mongodb://db:27017', {
      // Make sure that Mongoose doesn't use deprecated
      // MongoDb Node.js driver functions.
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

    // TODO
    // Types are not correct
    // eslint-disable-next-line
    // @ts-ignore
    mongooseInstance.ObjectId.get((v: mongoose.Types.ObjectId) =>
      v == null ? v : v.toString(),
    );

    return mongooseInstance;
  } catch (err) {
    logger.error('Could not connect with database', err);
    throw err;
  }
};
