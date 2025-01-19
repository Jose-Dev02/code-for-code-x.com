import { Schema, model } from "mongoose";
import { IUser } from "../interface/user_interfaces/user";

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  birthdate: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  imagen_avatar: {
    type: String,
  },
  imagen_palm: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  numerology: {
    type: Number,
    required: true,
  },
  readings: {
    type: [],
    default: [],
  },
});

const User = model<IUser>("User", UserSchema);
export default User;
