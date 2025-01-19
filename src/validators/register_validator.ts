import { error } from "console";
import { IUserRegister } from "../interface/user_interfaces/user_register";

export const register_validator = (user: IUserRegister) => {
  const errors = [];
  if (!user.birthdate) {
    errors.push("Birthdate not provided");
  }
  if (!user.email) {
    errors.push("Email not provided");
  }
  if (!user.gender) {
    errors.push("Gender not provided");
  }
  if (!user.last_name) {
    errors.push("Last name not provided");
  }
  if (!user.name) {
    errors.push("First name not provided");
  }
  if (!user.password) {
    errors.push("Password not provided");
  }

  return errors.length > 0
    ? { message: errors, isValid: false }
    : { isValid: true };
};
