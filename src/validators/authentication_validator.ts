import { IUserAuthentication } from "../interface/user_interfaces/user_authentication";

export const authentication_validator = (user: IUserAuthentication) => {
  const errors = [];
  if (!user.email) {
    errors.push("User missing");
  }

  if (!user.password) {
    errors.push("Password missing");
  }

  return errors.length > 0
    ? { message: errors, isValid: false }
    : { isValid: true };
};
