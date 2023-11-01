import { Router } from 'express';
import { Tasks } from '../db/schema/task';
import { logger } from '../logger';
import { getTaskByUser } from '../services/taskService';
import { NotFoundError } from '../errors';

export const apiRouter = Router();

apiRouter.get('/', async (req, res) => {
  try {
    const secret = JSON.parse(req.secret ? req.secret : '');
    const sessionUser = secret.id;
    const taskId = req.query.id as string;
    if (taskId) {
      const task = await getTaskByUser(
        taskId,
        `${sessionUser}`,
        secret.isAdmin
      );
      res.status(200).json(task);
    } else {
      res.status(400).json({ error: 'No task id provided' });
    }
  } catch (err) {
    if (err instanceof NotFoundError) {
      res.status(404).json({ error: 'Not found' });
    }
    res.status(500).send(err);
  }
});

apiRouter.get('/getAll', async (req, res) => {
  try {
    const secret = JSON.parse(req.secret ? req.secret : '');
    const sessionUser = secret.id;
    const findFilter: any = {};
    if (!secret.isAdmin) {
      findFilter.user = sessionUser;
    }
    const tasks = await Tasks.find(findFilter);
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).send(err);
  }
});

apiRouter.post('/', async (req, res) => {
  try {
    const secret = JSON.parse(req.secret ? req.secret : '');
    const sessionUser = secret.id;

    const { title, status } = req.body;
    const createdTask = await Tasks.create({
      title: title,
      status: status ? status : 'All',
      user: sessionUser,
    });
    res.status(200).json(createdTask);
  } catch (err) {
    res.status(500).send(err);
  }
});

apiRouter.put('/', async (req, res) => {
  try {
    const secret = JSON.parse(req.secret ? req.secret : '');
    const sessionUser = secret.id;
    const { id, title, status } = req.body;
    await getTaskByUser(id, `${sessionUser}`, secret.isAdmin);

    const findFilter: any = { _id: id };
    if (!secret.isAdmin) {
      findFilter.user = sessionUser;
    }

    const updateInfo: any = { _id: id };
    if (title) {
      updateInfo['title'] = title;
    }
    if (status) {
      updateInfo['status'] = status;
    }
    const updatedTask = await Tasks.findOneAndUpdate(findFilter, updateInfo);
    return res.status(200).json(updatedTask);
  } catch (err) {
    if (err instanceof NotFoundError) {
      return res.status(404).json({ error: 'Cannot update given task' });
    }
    return res.status(500).send(err);
  }
});

apiRouter.delete('/:id', async (req, res) => {
  try {
    const secret = JSON.parse(req.secret ? req.secret : '');
    const sessionUser = secret.id;
    const { id } = req.params;
    const deleteFilter: any = { _id: id };
    if (!secret.isAdmin) {
      deleteFilter.user = sessionUser;
    }
    const task = await Tasks.findOneAndDelete(deleteFilter);
    res.status(200).json(task);
  } catch (err) {
    res.status(500).send(err);
  }
});
