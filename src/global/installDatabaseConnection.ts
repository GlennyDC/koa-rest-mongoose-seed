import mongoose from 'mongoose';

export const installDatabaseConnection = async (): Promise<void> => {
  try {
    await mongoose.connect('mongodb://db:27017', {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } catch (err) {
    console.log(err);
  }
};
