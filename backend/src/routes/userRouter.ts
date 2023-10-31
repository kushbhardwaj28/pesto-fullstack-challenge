import { Router } from 'express';
import { Users } from '../db/schema/user';
import { logger } from '../../src/logger';
import { hash } from 'bcryptjs';

export const userRouter = Router();

userRouter.get('/user', async (req, res) => {
  const user = await Users.findById(req.query.id, {});
  if (user) {
    const data = user.toJSON();
    const { password, ...filterdUsers } = data;
    res.status(200).send(filterdUsers);
  } else {
  }
});

userRouter.get('/users', async (_, res) => {
  const users = await Users.find({});
  const filterdUsers = users.map((i) => {
    const data = i.toJSON();
    const { password, ...user } = data;
    return user;
  });
  res.status(200).send(filterdUsers);
});

userRouter.post('/user', async (req, res) => {
  const { name, username, password } = req.body;
  const encryptedPwd = hash(password, 7);
  const createdUser = await Users.create({
    name,
    username,
    password: encryptedPwd,
    status: 'active',
  });
  res.status(200).send(createdUser);
});

userRouter.put('/user', async (req, res) => {
  const { id, name, password } = req.body;
  const updateInfo: any = { _id: id };
  if (name) {
    updateInfo['name'] = name;
  }
  if (password) {
    const encryptedPwd = hash(password, 7);
    updateInfo['password'] = encryptedPwd;
  }
  const updatedUser = await Users.updateOne(updateInfo);
  res.status(200).send(updatedUser);
});

userRouter.delete('/user/:id', async (req, res) => {
  const { id } = req.params;
  const user = await Users.deleteOne({ _id: id });
  res.status(200).send(user);
});
