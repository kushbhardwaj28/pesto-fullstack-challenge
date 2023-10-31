import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { db } from './db/conn';
import { logger } from './logger';
import { apiRouter } from './routes/apiRouter';
import { userRouter } from './routes/userRouter';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: '*' }));

db();

//TODO: impelment auth middleware
app.use('/v1/api', apiRouter);
app.use('/account', userRouter);
app.all('*', (_, res) => {
  res.status(404).send('Invalid Path');
});

app.listen(port, () => {
  logger.info(`[server]: Server is running at http://localhost:${port}`);
});
