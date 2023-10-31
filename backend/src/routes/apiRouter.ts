import { Router } from 'express';
import { Tasks } from '../db/schema/task';
import { logger } from '../../src/logger';

export const apiRouter = Router();

apiRouter.get('/task', async (req, res) => {
  const task = await Tasks.findById(req.query.id);
  res.status(200).send(task);
});

apiRouter.get('/tasks', async (_, res) => {
  const tasks = await Tasks.find({});
  res.status(200).send(tasks);
});

apiRouter.post('/task', async (req, res) => {
  const { title, status } = req.body;
  const createdTask = await Tasks.create({
    title: title,
    status: status ? status : 'All',
    user: '3',
  });
  res.status(200).send(createdTask);
});

apiRouter.put('/task', async (req, res) => {
  const { id, title, status } = req.body;
  const updateInfo: any = { _id: id };
  if (title) {
    updateInfo['title'] = title;
  }
  if (status) {
    updateInfo['status'] = status;
  }
  const updatedTask = await Tasks.updateOne(updateInfo);
  res.status(200).send(updatedTask);
});

apiRouter.delete('/task/:id', async (req, res) => {
  const { id } = req.params;
  const task = await Tasks.deleteOne({ _id: id });
  res.status(200).send(task);
});
