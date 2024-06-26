import { Schema, model } from "mongoose";

const userSchema = new Schema({
  userid: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avartar: {
    type: String,
    default: "this is replace url image defaul",
  },
  remember: {
    type: Boolean,
    required: false,
  },
});

export const UserSchema = model("Users", userSchema);
