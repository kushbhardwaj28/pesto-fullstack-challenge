export interface ITask {
  _id?: string;
  title?: string;
  description?: string;
  status?: 'In progress';
  user?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
