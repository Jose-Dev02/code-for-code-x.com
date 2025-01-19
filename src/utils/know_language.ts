import { Request } from "express";

export const to_know_Language = (req: Request) => {
  const acceptLanguage = req.headers["accept-language"];
  const lang = acceptLanguage
    ? acceptLanguage.split(",")[0].split("-")[0]
    : "en";

  return lang;
};
