import { randomUUID } from 'crypto';
import { Schema, model } from 'mongoose';

const TaskSchema = new Schema(
  {
    _id: {
      type: String,
      default: () => {
        return randomUUID();
      },
    },
    title: { type: String, required: [true, 'Title is required'] },
    description: { type: String },
    status: {
      type: String,
      required: [true, 'status is required'],
      enum: {
        values: ['All', 'To Do', 'In Progress', 'Done'],
        message: 'Incorrect {VALUE} for status',
      },
    },
    user: { type: String, required: [true, 'User is required'] },
  },
  {
    timestamps: true,
    // validateBeforeSave:
    // _id: false,
  }
);

export const Tasks = model('task', TaskSchema, 'tasks');
