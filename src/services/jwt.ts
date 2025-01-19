//Importar dependencias
import { encode } from "jwt-simple";
import moment from "moment";
import { config } from "../config";
import { IUser } from "../interface/user_interfaces/user";

//Clave secreta
const clave_secreta = config.clave_secreta;

//Crear una funcion para generar token
const createToken = (user: IUser) => {
  const payload = {
    id: user._id,
    name: user.name,
    last_name: user.last_name,
    birthdate: user.birthdate,
    gender: user.gender,
    numerology: user.numerology,
    imagen_avatar: user.imagen_avatar,
    imagen_palm: user.imagen_palm,
    iat: moment().unix(),
    exp: moment().add(30, "days").unix(),
  };

  //Devolver un jwt token codificado
  return encode(payload, clave_secreta);
};

export default {
  clave_secreta,
  createToken,
};
