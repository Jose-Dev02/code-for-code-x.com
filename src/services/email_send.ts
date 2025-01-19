import nodemailer from "nodemailer";
import { config } from "../config";

const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  secure: config.email.secure,

  auth: {
    user: config.email.user,
    pass: config.email.password,
  },
});

// transporter.verify((error, _success) => {
//   if (error) {
//     console.error("Error al conectar con el servidor SMTP:", error);
//   } else {
//     console.log("Servidor SMTP conectado correctamente.");
//   }
// });

export const send_email = async (to: string, subject: string, html: string) => {
  try {
    const info = await transporter.sendMail({
      from: `${config.nameapp}<${config.email.user}>`,
      to,
      subject,
      html,
    });
    return info;
  } catch (error) {
    return error;
  }
};
