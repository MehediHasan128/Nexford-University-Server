/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt';
import config from '../../config';
import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
// import AppError from '../../errors/AppError';
// import httpStatus from 'http-status';

const createUserSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      select: 0
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangeAt: {
      type: Date
    },
    role: {
      type: String,
      enum: ['student', 'faculty', 'admin'],
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'blocked'],
      default: 'active',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

createUserSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

createUserSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

export const User = model<TUser>('user', createUserSchema);
