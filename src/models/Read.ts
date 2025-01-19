import { model, Schema } from "mongoose";
import { IRead } from "../interface/read_interfaces/read_interface";

const lineOptionSchema = new Schema({
  line: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
});

const ReadSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  desctiption: {
    type: String,
    required: true,
  },
  imagen_palm: {
    type: String,
    default: "",
  },
  lines_options: {
    type: [lineOptionSchema],
    default: [],
  },
});

const Read = model<IRead>("Read", ReadSchema);

export default Read;
