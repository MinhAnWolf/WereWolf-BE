import { Schema, model } from "mongoose";

const roleSchema = new Schema({
  roleId: {
    type: Number,
    require: true,
  },
  roleName: {
    type: String,
    require: true,
  },
  skill: {
    type: String,
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
  group: {
    type: Number, // 1: villagerRole - 2:werewolfRole - 3:specialRole
    require: true,
  },
});

export const RoleSchema = model("Role", roleSchema);
