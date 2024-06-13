import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  remember: {
    type: Boolean,
    require: true,
  },
});

export const UserSchema = model("Users", userSchema);
