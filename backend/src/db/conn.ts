import mongoose from 'mongoose';
import { logger } from '../../src/logger';

export const db = async () => {
  try {
    const dbUrl =
      process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017';
    const dbName = process.env.DB_NAME || 'task-manager';
    const connection = await mongoose.connect(dbUrl, {
      auth: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
      },
      dbName,
    });
    if (connection) {
      logger.info('Connected to database');
    }
  } catch (err) {
    logger.error('Error connecting database', err);
  }
};
