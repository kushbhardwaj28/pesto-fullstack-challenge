import { NotFoundError } from '../errors';
import { Tasks } from '../db/schema/task';

export const getTaskByUser = async (
  id: string,
  userId: string,
  isAdmin: boolean
) => {
  const task = await Tasks.findById(id);
  if (task?.user === userId || isAdmin) {
    return task;
  } else {
    throw new NotFoundError();
  }
};
