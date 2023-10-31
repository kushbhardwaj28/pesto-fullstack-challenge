import { randomUUID } from 'crypto';
import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
  {
    _id: {
      type: String,
      default: () => {
        return randomUUID();
      },
    },
    name: { type: String, required: [true, 'Name is required'] },
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
    },
    password: { type: String, required: [true, 'Password is required'] },
    status: {
      type: String,
      required: [true, 'status is required'],
      enum: {
        values: ['active', 'in-active'],
        message: 'Incorrect {VALUE} for status',
      },
    },
  },
  {
    timestamps: true,
  }
);

export const Users = model('user', UserSchema, 'users');
