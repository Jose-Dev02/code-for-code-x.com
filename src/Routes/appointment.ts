import { Router } from "express";
import { auth } from "../middlewares/auth";
import Appointment from "../controllers/appointment";
import { mobileCheck } from "../middlewares/mobile_cheker";

const router = Router();


router.post("/create-appointment", [auth,mobileCheck], Appointment.createAppointment);
router.get("/get-appointments/:id_assistant", [auth,mobileCheck], Appointment.getEventsFromCalendarID);
router.get("/get-appointment-by-id/:id_appointment", [auth,mobileCheck], Appointment.getAppointmentsById);


export default router;

