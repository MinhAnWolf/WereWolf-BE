import { Schema, model } from "mongoose";

const roleSchema = new Schema({
  roleId: {
    type: String,
    require: true,
  },
  roleName: {
    type: String,
    require: true,
  },
  skill: {
    type: [],
    require: true,
  },
  kick: {
    type: [],
    require: true,
  },
  effect: {
    type: [],
    require: true,
  },
});

export const RoleSchema = model("Role", roleSchema);
