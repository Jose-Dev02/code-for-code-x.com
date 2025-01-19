//Importar dependencias
import connection from "./database/connection";
import express, { Application } from "express";
import cors from "cors";

//Cargar conf rutas
import UserRoutes from "./Routes/user";
import ReadRoutes from "./Routes/read";
import AssistantRoutes from "./Routes/assistant";
import AppointmentsRoutes from "./Routes/appointment";

import { config } from "./config";
//Mensaje bienvenida
console.log("API Banskiy funcionando");

//Conexion a bd
try {
  connection();
} catch (error) {
  console.log(error);
}
const app: Application = express();
const port = config.puerto ?? 3900;

const corsOptions = {
  origin: "http://185.222.241.27:10001",
  optionsSuccessStatus: 200,
};
const corsOptionsGeneral = {
  origin: "*",
};



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", cors(corsOptionsGeneral), UserRoutes);
app.use("/api/read", cors(corsOptionsGeneral), ReadRoutes);
app.use("/api/assistans", cors(corsOptions), AssistantRoutes);
app.use("/api/appointments",cors(corsOptionsGeneral),AppointmentsRoutes);


app.listen(port, () => {
  console.log("Servidor de node corriendo en el puerto: ", port);
});
