/* eslint-disable @typescript-eslint/no-this-alias */
import { Document, Schema } from "mongoose";
import { UserCredentials } from "../schemas";

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema<UserCredentials & Document>(
  {
    name:{
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      //   validate(value: string) {
      //     if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
      //       throw new Error('Password must contain at least one letter and one number');
      //     }
      //   },
      private: true, // used by the toJSON plugin
    },

  },
  {
    timestamps: true,
  }
);



userSchema.methods.isPasswordMatch = async function (password:string):Promise<boolean> {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});


export const User = mongoose.model('users', userSchema);

