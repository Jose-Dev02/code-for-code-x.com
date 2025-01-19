import { Request, Response } from "express";
import { IAssistantCreate } from "../interface/assistants interfaces/assistants_create";
import Assistant from "../models/Assistant";
import { assitant_validator } from "../validators/assistants_validator";
import { retrys } from "../utils/retrys_querys";
import { IAssistant } from "../interface/assistants interfaces/assistants";

const createAssistant = async (req: Request, res: Response) => {
  const assistant: IAssistantCreate | null =
    req.body as unknown as IAssistantCreate;

  const valid_assistant = assitant_validator(assistant);

  if (!valid_assistant.isValid)
    return res
      .status(400)
      .json({ status: "error", message: valid_assistant.message });

  try {
    const response = await retrys(() =>
      Assistant.findOne({
        name: assistant.name,
        last_name: assistant.last_name,
        location: assistant.location,
        calendarID: assistant.calendarID
      })
    );

    const typeResponse = response as IAssistant | null;

    if (typeResponse) {
      return res.status(302);
    } else {
      const assistant_to_save = new Assistant(assistant);

      const response = await retrys(() => assistant_to_save.save());

      const typeResponse = response as IAssistant | null;

      if (!typeResponse) {
        return res.status(500).send({
          status: "error",
          message: "An error occurred while querying the database",
        });
      } else {
        return res.status(201);
      }
    }
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: error,
    });
  }
};

const updateAssistant = async (req: Request, res: Response) => {
  const assistant: IAssistantCreate = req.body as unknown as IAssistantCreate;
  const { id } = req.params;
  try {
    const exist = await retrys(() => Assistant.findById(id));

    const typedResponse = exist as IAssistant | null;

    if (!typedResponse) {
      return res.status(404).json({ status: "error", message: "Not Found" });
    } else {
      const response = await retrys(() =>
        Assistant.findByIdAndUpdate(id, assistant, { new: true })
      );

      const typedResponse = response as IAssistant | null;
      if (typedResponse) return res.status(201);

      return res.status(500).send({
        status: "error",
        message: "An error occurred while querying the database",
      });
    }
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: error,
    });
  }
};

const getAllAssistant = async (req: Request, res: Response) => {
  try {
    const response = await retrys(() => Assistant.find());

    const typedResponse = response as IAssistant[];

    if (typedResponse.length > 0) {
      return res.status(200).send({ status: "success", data: typedResponse });
    } else {
      return res.status(404);
    }
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "An error occurred while querying the database",
    });
  }
};

const getByIdAssistant = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const response = await retrys(() => Assistant.findById(id));
    const typedResponse = response as IAssistant | null;
    if (typedResponse) {
      return res.status(200).json({ status: "success", data: typedResponse });
    } else {
      return res.status(404);
    }
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "An error occurred while querying the database",
    });
  }
};

const deleteAssistant = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const response = await retrys(() => Assistant.findByIdAndDelete(id));

    const typedReponse = response as IAssistant | null;

    if (typedReponse) {
      return res.status(200).json({ status: "success" });
    } else {
      return res.status(404);
    }
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "An error occurred while querying the database",
    });
  }
};

export default {
  createAssistant,
  updateAssistant,
  getAllAssistant,
  getByIdAssistant,
  deleteAssistant,
};
