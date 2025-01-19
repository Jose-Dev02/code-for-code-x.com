import { model, Schema } from "mongoose";
import { IAppointment } from "../interface/appointment interfaces/appointment";

const AppointmentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assistantId: {
      type: Schema.Types.ObjectId,
      ref: "Assistant",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true
    },
    googleEventId: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);
const Appointment = model<IAppointment>("Appointment", AppointmentSchema);

export default Appointment;