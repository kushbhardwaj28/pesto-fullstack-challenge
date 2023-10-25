import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { apiRouter } from './routes/apiRouter';
import { logger } from './logger';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: '*' }));

//TODO: impelment auth middleware
app.use('/v1/api', apiRouter);
app.all('*', (_, res) => {
  res.status(404).send('Invalid Path');
});

app.listen(port, () => {
  logger.info(`[server]: Server is running at http://localhost:${port}`);
});
