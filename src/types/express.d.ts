import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        name: string;
        last_name: string;
        birthdate: string;
        gender: string;
        numerology: number;
        imagen_avatar: string;
        imagen_palm: string;
        iat: any;
        exp: any;
      };
    }
  }
}
