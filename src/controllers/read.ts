import { Request, Response } from "express";

import { getChatGPTResponse } from "../services/open_ai_client";

import { getTemplateMessage } from "../utils/message_to_chatgpts_template_es";

import { IMessage_ChatGPT } from "../interface/message_chatgpt_interface/message_chatgpt";
import { IUser_info_to_chatGpt } from "../interface/message_chatgpt_interface/user_info_to_chatgpt";
import { IRead } from "../interface/read_interfaces/read_interface";

import Read from "../models/Read";
import User from "../models/User";

const read_From_ChatGPT = async (req: Request, res: Response) => {
  const user = req.user;

  const userGpt: IUser_info_to_chatGpt = {
    birthdate: user.birthdate,
    gender: user.gender,
    numerology: user.numerology,
  };

  const { palm } = req.body;
  const { title } = req.body;
  const messages: IMessage_ChatGPT[] = [
    {
      role: "system",
      content: "Simula q eres un Asistente en quiromancia professional",
    },

    {
      role: "user",
      content: getTemplateMessage(userGpt, palm),
    },

    {
      role: "user",
      content: "Devuélveme la respuesta en un string con texto plano.",
    },
  ];

  try {
    const response = await getChatGPTResponse(messages);

    const lineoptions: any = [];

    palm.lines_options.map((option: any) => {
      lineoptions.push(option);
    });

    if (response && response.chatgptResponse !== "") {
      const read: IRead = {
        user: user.id,
        title: title,
        imagen_palm: user.imagen_palm,
        desctiption: response.chatgptResponse,
        lines_options: lineoptions,
      };

      const read_to_save = new Read(read);

      const response_read_saving = await read_to_save.save();

      const response_user = await User.findById({ _id: user.id });

      if (!response_read_saving || !response_user) {
        return res.status(500).send({
          status: "error",
          message: "An error occurred while querying the database",
        });
      }

      response_user.readings.push(response_read_saving._id);

      const response_updated_user = await User.findByIdAndUpdate(
        { _id: user.id },
        response_user,
        { new: true }
      );
      if (!response_updated_user) {
        return res.status(500).send({
          status: "error",
          message: "An error occurred while querying the database",
        });
      }
      return res.status(200).json({
        status: "success",
        data: response.chatgptResponse,
      });
    }

    return res.status(500).json({ status: "error", message: "BAD_REQUEST" });
  } catch (error) {
    return res.status(500).json({ status: "error", error: error });
  }
};

const get_User_Reads = async (req: Request, res: Response) => {
  const user = req.user;

  try {
    const response = await User.findById({ _id: user.id });

    if (!response) {
      return res.status(500).send({
        status: "error",
        message: "An error occurred while querying the database",
      });
    }

    const readings = await Promise.all(
      response.readings.map(async (read) => {
        const resp = await Read.findById({ _id: read }).select({
          __v: 0,
          user: 0,
        });

        if (!resp) {
          throw new Error("An error occurred while querying the database");
        }
        return resp;
      })
    );

    return res.status(200).json({
      status: "success",
      data: readings,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      error: error,
    });
  }
};

const getReadById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const response = await Read.findById({ _id: id });

    if (!response) {
      return res.status(500).send({
        status: "error",
        message: "An error occurred while querying the database",
      });
    }

    return res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      error: error,
    });
  }
};
export default {
  read_From_ChatGPT,
  getReadById,
  get_User_Reads,
};
