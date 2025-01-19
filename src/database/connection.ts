import { connect } from "mongoose";
import { retrys } from "../utils/retrys_querys";
import { config } from '../config';
const connection_string = config.connection_string;

const connection = async () => {
  try {
    await retrys(() => connect(connection_string));

    console.log("Conectado correctamente a db: banskiy palmistry DB");
  } catch (error) {
    console.log(error);
    throw new Error("No se ha podido conectar a la base de datos");
  }
};

export default connection;
