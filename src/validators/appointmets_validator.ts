import { IAppointment_Create } from "../interface/appointment interfaces/appointment_create";


export const appointment_validator = (appointment: IAppointment_Create) => {
  const errors = [];

  if (!appointment.assistantId) errors.push("Assistant missing");
  if (!appointment.userId) errors.push("User missing");
  if (!appointment.title) errors.push("Title missing");
  if (!appointment.startDate) errors.push("Start date missing");
  if (!appointment.endDate) errors.push("End date missing");
  if (!appointment.description) errors.push("Description missing");

  return errors.length > 0
    ? { message: errors, isValid: false }
    : { isValid: true };
};
