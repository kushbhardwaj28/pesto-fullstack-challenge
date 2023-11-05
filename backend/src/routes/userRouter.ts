import { Router } from 'express';
import { Users } from '../db/schema/user';
import { logger } from '../../src/logger';
import { hash } from 'bcryptjs';
import { NotFoundError, UnAuthorizedError } from '../errors';
import { filterObjWithKey } from '../services/utils';

export const userRouter = Router();

userRouter.get('/user', async (req, res) => {
  try {
    const secret = JSON.parse(req.secret ? req.secret : '');
    const sessionUser = secret.id;
    const user = await Users.findById(sessionUser);
    if (user) {
      const data = filterObjWithKey('password', user.toJSON());
      res.status(200).json(data);
    } else {
      throw new NotFoundError();
    }
  } catch (err) {
    if (err instanceof NotFoundError) {
      res.status(404).json({ error: err.message });
    }
    res.status(500).send(err);
  }
});

userRouter.get('/users', async (req, res) => {
  try {
    const secret = JSON.parse(req.secret ? req.secret : '');
    if (secret.isAdmin) {
      const users = await Users.find({});
      const filterdUsers = users.map((i) =>
        filterObjWithKey('password', i.toJSON())
      );
      res.status(200).json(filterdUsers);
    } else {
      throw new UnAuthorizedError();
    }
  } catch (err) {
    if (err instanceof UnAuthorizedError) {
      res.status(401).json({ error: err.message });
    }
    res.status(500).send(err);
  }
});

userRouter.put('/', async (req, res) => {
  try {
    const secret = JSON.parse(req.secret ? req.secret : '');
    const sessionUser = secret.id;
    const { id, name, password } = req.body;
    if (secret.isAdmin || id === sessionUser) {
      const updateInfo: any = { _id: id };
      if (name) {
        updateInfo['name'] = name;
      }
      if (password) {
        const encryptedPwd = await hash(password, 7);
        updateInfo['password'] = encryptedPwd;
      }
      const updatedUser = await Users.updateOne(updateInfo);
      res.status(200).json(updatedUser);
    } else {
      throw new UnAuthorizedError();
    }
  } catch (err) {
    if (err instanceof UnAuthorizedError) {
      res.status(401).json({ error: err.message });
    }
    res.status(500).send(err);
  }
});

userRouter.delete('/user/:id', async (req, res) => {
  try {
    const secret = JSON.parse(req.secret ? req.secret : '');
    if (secret.isAdmin) {
      const { id } = req.params;
      const user = await Users.deleteOne({ _id: id });
      res.status(200).json(user);
    } else {
      throw new UnAuthorizedError();
    }
  } catch (err) {
    if (err instanceof UnAuthorizedError) {
      res.status(401).json({ error: err.message });
    }
    res.status(500).send(err);
  }
});
