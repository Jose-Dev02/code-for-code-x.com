import { Request, Response, NextFunction } from "express";

export const authAssistant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user, password } = req.body;

  if (!user || user !== "admin") res.status(400);
  if (!password || password !== "Difficul_21DE12") res.status(400);

  next();
};
