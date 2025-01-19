//Importar dependencias y modulos
import { Request, Response } from "express";
import { hash, compare } from "bcrypt";
import { unlinkSync, stat, realpathSync } from "fs";
import { resolve } from "path";

// import axiosRetry from "axios-retry";

//Importar modelos
import User from "../models/User";
import Codigo_Verification from "../models/Code_Verification";

//Importar Servicios
import jwt from "../services/jwt";
import { getCode } from "../services/code_email";
import { send_email } from "../services/email_send";

//Import interfaces
import { IUserAuthentication } from "../interface/user_interfaces/user_authentication";
import { IUserRegister } from "../interface/user_interfaces/user_register";
import { IUser } from "../interface/user_interfaces/user";
import { IUserUpdate } from "../interface/user_interfaces/user_update";

//Import validators
import { register_validator } from "../validators/register_validator";
import { authentication_validator } from "../validators/authentication_validator";

//Import Utils

import { to_know_Language } from "../utils/know_language";
import { calculateNumerology } from "../utils/numerology_script";

import {
  getTemplatePasswordRecovery_ES,
  getTemplateSuccessEmail_ES,
  getTemplateVerificationEmail_ES,
  subjectRecoveryPass_es,
  subjectRegister_es,
  subjectVerification_es,
} from "../utils/email_templates_es";
import {
  getTemplatePasswordRecovery_EN,
  getTemplateSuccessEmail_EN,
  getTemplateVerificationEmail_EN,
  subjectRecoveryPass_en,
  subjectRegister_en,
  subjectVerification_en,
} from "../utils/email_templates_en";
import { retrys } from "../utils/retrys_querys";

//Registro de usuario
const register = async (req: Request, res: Response) => {
  const register_user: IUserRegister = req.body;
  register_user.email = req.body.email.toLowerCase();

  const lang = to_know_Language(req);

  //Comprobar q me llegan bien (+validacion)
  const valid_register = register_validator(register_user);
  if (!valid_register.isValid) {
    return res.status(400).json({
      status: "error",
      message: "Error in registration proccess",
    });
  }
  try {
    // Cifrar la contraseña
    const pwd = await hash(register_user.password, 10);
    register_user.password = pwd;

    const fullname = `${register_user.name} ${register_user.last_name}`;

    register_user.numerology = calculateNumerology(fullname);

    //Crear objeto de usuario
    const user_to_save = new User(register_user);

    //Guardar usuario en la base de datos
    const response = await retrys(() => user_to_save.save());

    if (!response)
      return res.status(500).send({
        status: "error",
        message: "An error occurred while querying the database",
      });

    const subject = lang === "es" ? subjectRegister_es : subjectRegister_en;

    const html =
      lang === "es"
        ? getTemplateSuccessEmail_ES(
            `${register_user.name} ${register_user.last_name}`
          )
        : getTemplateSuccessEmail_EN(
            `${register_user.name} ${register_user.last_name}`
          );
    await retrys(() => send_email(register_user.email, subject, html));

    return res.status(200).json({
      status: "success",
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error });
  }
};

//Verificar emails existenes
const verify_email = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const response = await retrys(() => User.findOne({ email: email }));

    if (!response) {
      return res.status(200).json({ status: "success" });
    }

    return res.status(200).json({
      status: "success",
      message: "Email already exist",
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error });
  }
};

//Verificacion del codigo del Email
const code_verification = async (req: Request, res: Response) => {
  const { email } = req.body;

  const lang = to_know_Language(req);

  try {
    const response_code = await retrys(() =>
      Codigo_Verification.findOne({ userEmail: email })
    );
    if (response_code) {
      await retrys(() => Codigo_Verification.deleteOne({ userEmail: email }));
    }
    const code: string = getCode();

    const subject =
      lang === "es" ? subjectVerification_es : subjectVerification_en;

    const html =
      lang === "es"
        ? getTemplateVerificationEmail_ES(code)
        : getTemplateVerificationEmail_EN(code);
    await retrys(() => send_email(email, subject, html));

    const code_to_save = new Codigo_Verification({
      userEmail: email,
      code: code,
    });

    const response = await retrys(() => code_to_save.save());

    if (!response)
      return res.status(500).send({
        status: "error",
        message: "An error occurred while querying the database",
      });

    return res.status(200).json({
      status: "success",
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: error,
    });
  }
};

const verify_code_email = async (req: Request, res: Response) => {
  const { code, email } = req.body;

  try {
    const code_response = await retrys(() =>
      Codigo_Verification.findOne({
        userEmail: email,
      })
    );

    const typedCodeResponse = code_response as { code: string };

    if (!typedCodeResponse) {
      return res.status(500).json({
        status: "error",
        message: "An error occurred while querying the database",
      });
    }
    if (typedCodeResponse.code !== code) {
      return res.status(429).json({ status: "error", message: "Invalid Code" });
    }

    return res.status(200).json({ status: "success" });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error });
  }
};
//Login de usuario
const login = async (req: Request, res: Response) => {
  //Recoger parametros body
  const user_authentication: IUserAuthentication = req.body;

  const valid_authentication = authentication_validator(user_authentication);
  //Validar authenticacion
  if (!valid_authentication.isValid) {
    return res.status(400).send({
      status: "error",
    });
  }
  //Buscar en la bd si existe
  try {
    const exist = await retrys(() =>
      User.findOne({
        email: user_authentication.email.toLowerCase(),
      })
    );

    const typedUser = exist as IUser | null;
    if (!typedUser)
      return res.status(404).send({
        status: "error",
        message: "User does not exist",
      });

    //Comprobar su contraseña
    const pwd = await compare(user_authentication.password, typedUser.password);

    if (!pwd)
      return res.status(404).send({
        status: "error",
        message: "Incorrect password",
      });

    //Conseguir el Token
    const token = jwt.createToken(typedUser);

    //Eliminar contraseña

    //Devolver datos usuario
    return res.status(200).send({
      status: "success",
      token: token,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: error,
    });
  }
};

//Editar perfil
const edit_profile = async (req: Request, res: Response) => {
  //Recoger info del usuario a actualizar
  const user_identity = req.user;
  const user_to_update: IUserUpdate | null = req.body as unknown as IUserUpdate;

  const condition =
    user_identity.name.toLowerCase() !== user_to_update.name.toLowerCase() ||
    user_identity.last_name.toLowerCase() !==
      user_to_update.last_name.toLowerCase();

  if (condition) {
    const fullname = `${user_to_update.name} ${user_to_update.last_name}`;
    user_to_update.numerology = calculateNumerology(fullname);
  }

  //Buscar y actualizar
  try {
    const response = await retrys(() =>
      User.findByIdAndUpdate(user_identity.id, user_to_update, {
        new: true,
      })
    );

    const typeUpdatedUser = response as IUser | null;

    if (!typeUpdatedUser) {
      throw new Error("User does not exist in the database");
    }

    const newToken = jwt.createToken(typeUpdatedUser);
    return res.status(200).send({
      status: "success",
      token: newToken,
    });
  } catch (error) {
    return res.status(404).send({
      status: "error",
      message: "User not found or does not exist",
    });
  }
};

//Recuperar contraseña codigo email
const password_recovery_code_email = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const response = await retrys(() => User.findOne({ email: email }));

    if (!response)
      return res.status(404).json({
        status: "error",
        message: "User not found.",
      });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: error,
    });
  }

  try {
    await retrys(() =>
      Codigo_Verification.findOneAndDelete({ userEmail: email })
    );
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "An error occurred while querying the database",
    });
  }

  const lang = to_know_Language(req);

  const code: string = getCode();

  const subject =
    lang === "es" ? subjectRecoveryPass_es : subjectRecoveryPass_en;

  const html =
    lang === "es"
      ? getTemplatePasswordRecovery_ES(code)
      : getTemplatePasswordRecovery_EN(code);

  await retrys(() => send_email(email, subject, html));

  try {
    const code_to_save = new Codigo_Verification({ email, code });

    const response = await retrys(() => code_to_save.save());

    if (!response)
      return res.status(500).send({
        status: "error",
        message: "An error occurred while querying the database",
      });

    return res.status(200).json({
      status: "success",
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error });
  }
};

//Editar password desde el recovery
const edit_password_from_recovery = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const pwd = await hash(password, 10);

    const response_new_pass = await retrys(() =>
      User.findOneAndUpdate({ email: email }, { password: pwd }, { new: true })
    );

    if (!response_new_pass) {
      return res.status(500).json({
        status: "error",
        message: "An error occurred while querying the database",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Password updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error,
    });
  }
};
//Subir avatar
const upload_avatar = async (req: Request, res: Response) => {
  //Recoger el fichero de image y comprobar q existe
  if (!req.file)
    return res.status(404).send({
      status: "error",
      message: "The request does not include the image",
    });

  //Conseguir el nombre del archivo
  const image = req.file.originalname;

  //Sacar la extension del archivo
  const imgSplit = image.split(".");
  let extension;
  imgSplit[2] ? (extension = imgSplit[2]) : (extension = imgSplit[1]);

  //Comprobar extension
  const allowedExtensions = ["jpeg", "jpg", "png", "webp", "svg"];
  if (!allowedExtensions.includes(extension)) {
    const filePath = req.file.path;
    const fileDelete = unlinkSync(filePath);

    return res.status(400).send({
      status: "error",
      message: "Unsupported image format",
    });
  }
  try {
    const user_img_update = await retrys(() =>
      User.findByIdAndUpdate(
        { _id: req.user.id },
        { image: req.file?.filename },
        { new: true }
      )
    );
    if (!user_img_update) throw new Error("No file found ");

    return res.status(200).send({
      status: "success",
    });
  } catch (error) {
    return res.status(404).send({
      status: "error",
      message: error,
    });
  }
};

//Subbir palma
const upload_palm = async (req: Request, res: Response) => {
  //Recoger el fichero de image y comprobar q existe
  if (!req.file)
    return res.status(404).send({
      status: "error",
      message: "The request does not include the image",
    });

  //Conseguir el nombre del archivo
  const image = req.file.originalname;

  //Sacar la extension del archivo
  const imgSplit = image.split(".");
  let extension;
  imgSplit[2] ? (extension = imgSplit[2]) : (extension = imgSplit[1]);

  //Comprobar extension
  const allowedExtensions = ["jpeg", "jpg", "png", "webp", "svg"];
  if (!allowedExtensions.includes(extension)) {
    const filePath = req.file.path;
    const fileDelete = unlinkSync(filePath);

    return res.status(400).send({
      status: "error",
      message: "Unsupported image format",
    });
  }
  try {
    const user_img_palm = await retrys(() =>
      User.findByIdAndUpdate(
        { _id: req.user.id },
        { imagen_palm: req.file?.filename },
        { new: true }
      )
    );
    if (!user_img_palm) throw new Error("No file found ");

    return res.status(200).send({
      status: "success",
    });
  } catch (error) {
    return res.status(404).send({
      status: "error",
      message: error,
    });
  }
};

//Cargar avatar
const avatar = async (req: Request, res: Response) => {
  //Sacar el parametro de la url
  const file = req.params.file;
  const user = req.user;

  //Montar el path real de la imagen
  const filePath = `./uploads/${user.id} - ${user.name} ${user.last_name}/avatar/${file}`;

  //Comprobar q existe
  stat(filePath, (error, exist) => {
    if (!exist)
      return res.status(404).send({
        status: "error",
        message: error,
      });

    //Devolver un file
    return res.sendFile(resolve(filePath));
  });
};

//Cargar palma
const palm = async (req: Request, res: Response) => {
  //Sacar el parametro de la url
  const file = req.params.file;
  const user = req.user;

  //Montar el path real de la imagen
  const filePath = `./uploads/${user.id} - ${user.name} ${user.last_name}/palm/${file}`;

  //Comprobar q existe
  stat(filePath, (error, exist) => {
    if (!exist)
      return res.status(404).send({
        status: "error",
        message: error,
      });

    //Devolver un file
    return res.sendFile(resolve(filePath));
  });
};

export default {
  register,
  login,
  verify_email,
  edit_profile,
  code_verification,
  verify_code_email,
  password_recovery_code_email,
  edit_password_from_recovery,
  upload_avatar,
  upload_palm,
  avatar,
  palm,
};
