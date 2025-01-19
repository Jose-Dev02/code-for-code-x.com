import { Schema, model } from "mongoose";
import { IAssistant } from "../interface/assistants interfaces/assistants";

const AssistantSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  language: {
    type: [String],
    default: [],
  },

  calendarID: {
    type: String,
    required: true
  },

  // reservation: {
  //   type: [],
  //   default: [],
  // },
});

const Assistant = model<IAssistant>("Assistant", AssistantSchema);
export default Assistant;
