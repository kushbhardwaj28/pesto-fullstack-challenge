import { Schema, model } from 'mongoose';

const TaskSchema = new Schema(
  {
    title: { type: String, required: [true, 'Title is required'] },
    status: {
      type: String,
      enum: {
        values: ['All', 'To Do', 'In Progress', 'Done'],
        message: 'Incorrect {VALUE} for status',
      },
    },
    user: { type: String, require: [true, 'User is required'] },
  },
  {
    timestamps: true,
    // validateBeforeSave:
    // _id: true,
  }
);

export const Tasks = model('task', TaskSchema, 'tasks');
