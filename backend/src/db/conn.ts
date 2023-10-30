import mongoose from 'mongoose';
import { logger } from '../../src/logger';

export const db = async () => {
  try {
    const options = {
      useNewUrlParse: true,
    };

    const connection = await mongoose.connect('mongodb://localhost:27017', {
      auth: { username: 'root', password: 'password' },
      dbName: 'task-manager',
    });
    if (connection) {
      logger.info('Connected to databse');
    }
  } catch (err) {
    logger.error('Error connecting database', err);
  }
};
