import dotenv from 'dotenv';
dotenv.config();

import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { db } from './db/conn';
import { logger } from './logger';
import { apiRouter } from './routes/taskRouter';
import { userRouter } from './routes/userRouter';
import { Users } from './db/schema/user';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { SECRET, port } from './constants';
import { authMiddleware } from './middleware/auth';
import { hash } from 'bcryptjs';
import { filterObjWithKey } from './services/utils';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));

db();

//TODO: impelment auth middleware
app.use('/v1/api/task', authMiddleware, apiRouter);
app.use('/account', authMiddleware, userRouter);

app.post('/register', async (req, res) => {
  try {
    const { name, username } = req.body;
    let pwd = req.body.password;
    const encryptedPwd = await hash(pwd, 7);
    const createdUser = await Users.create({
      name,
      username,
      password: encryptedPwd,
      status: 'active',
    });
    res.status(200).send(filterObjWithKey('password', createdUser.toJSON()));
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({ username });
    if (user) {
      const isValidUser = await compare(password, user.password);
      if (isValidUser) {
        const token = sign({ id: user._id, username: user.username }, SECRET);
        const expires = new Date();
        expires.setTime(expires.getTime() + 24 * 60 * 60 * 1000);
        res
          .cookie('user_token', token, {
            expires: expires,
            path: '/',
          })
          .status(200)
          .send('Success');
      } else {
        res.status(400).json({ error: 'Invalid username or password' });
      }
    } else {
      res.status(400).json({ error: 'Invalid username or password' });
    }
  } catch (err) {
    res.send(500).send(err);
  }
});
app.all('*', (_, res) => {
  res.status(404).send('Invalid Path');
});

app.listen(port, () => {
  logger.info(`[server]: Server is running at http://localhost:${port}`);
});
