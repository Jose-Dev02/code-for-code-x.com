import { IAssistantCreate } from "../interface/assistants interfaces/assistants_create";


export const assitant_validator = (assistant: IAssistantCreate) => {
  const errors = [];

  if (!assistant.name) errors.push("Name missing");
  if (!assistant.last_name) errors.push("Last Name missing");
  if (!assistant.email) errors.push("Email missing");
  if (!assistant.location) errors.push("Location missing");
  if (!assistant.calendarID) errors.push("Calendar ID missing");
  if (!assistant.language || assistant.language.length === 0)
    errors.push("Language missing");

  return errors.length > 0
    ? { message: errors, isValid: false }
    : { isValid: true };
};
