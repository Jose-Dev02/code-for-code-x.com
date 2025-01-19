//Importar dependencias y modulos
import { decode } from "jwt-simple";
import { unix } from "moment";
import { config } from "../config";
import { Request, Response, NextFunction } from "express";

//Importar clave secreta
const secret = config.clave_secreta;

//MIDDLEWARE de autenticacion

export const auth = (req: Request, res: Response, next: NextFunction) => {
  //Comprobar si me llega el header de autenticacion
  if (!req.headers.authorization) {
    return res.status(403).send({
      status: "error",
      message: "La peticion no tiene la cabecera de autenticacion",
    });
  }

  //Limpiar el token
  const authHeader = req.headers.authorization;
  let token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  if (!token) {
    return res.status(403).send({
      status: "error",
      message: "Token de autenticación no válido o ausente.",
    });
  }

  //Decodificar el token
  try {
    let payload = decode(token, secret);
    //Comprobar expiracion del token
    if (payload.exp <= unix(30)) {
      return res.status(401).send({
        status: "error",
        message: "Token expirado",
      });
    }
    //Agregar datos de usuario a request
    req.user = payload;
  } catch (error) {
    return res.status(404).send({
      status: "error",
      message: "Token invalido",
    });
  }

  //Pasar a ejecucion de accion
  next();
};
