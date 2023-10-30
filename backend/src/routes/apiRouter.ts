import { Router } from 'express';
import { Tasks } from '../db/schema/task';

export const apiRouter = Router();

apiRouter.get('/task', (req, res) => {
  const task = Tasks.findById(req.body.id);
  res.status(200).send(task);
});

apiRouter.get('/tasks', async (_, res) => {
  const tasks = await Tasks.find({});
  res.status(200).send(tasks);
});

apiRouter.post('/task', async (_, res) => {
  const createdTask = await Tasks.create({
    title: 'Hello',
    status: 'Done',
    user: '1',
  });
  res.status(200).send(createdTask);
});

apiRouter.put('/task', (_, res) => {
  res.status(200).send('Task Updated');
});

apiRouter.delete('/task', (_, res) => {
  res.status(200).send('Task Deleted');
});
