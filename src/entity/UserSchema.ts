import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  remember: {
    type: Boolean,
    required: true,
  },
});

export const UserSchema = model("Users", userSchema);
