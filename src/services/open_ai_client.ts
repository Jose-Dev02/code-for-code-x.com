import OpenAI from "openai";

import { config } from "../config";

import { IMessage_ChatGPT } from "../interface/message_chatgpt_interface/message_chatgpt";

const client = new OpenAI({
  apiKey: config.openAi.api_key,
  organization: config.openAi.organization_id,
  project: config.openAi.project_id,
});

/**
 * Función para interactuar con la API de OpenAI usando la librería oficial
 * @param messages - Mensajes que se enviarán al modelo GPT
 * @returns Respuesta del modelo junto con los valores adicionales
 */
export const getChatGPTResponse = async (messages: IMessage_ChatGPT[]) => {
  if (!messages || !Array.isArray(messages)) {
    throw new Error('El parámetro "messages" debe ser un arreglo de mensajes.');
  }

  try {
    const response = await client.chat.completions.create({
      model: config.openAi.model,
      store: config.openAi.store,
      messages: messages,
      temperature: 0.7,
    });

    if (response.choices && response.choices[0]) {
      return {
        chatgptResponse: response.choices[0].message?.content || "",
      };
    } else {
      throw new Error("La respuesta no contiene los datos esperados.");
    }
  } catch (error) {
    console.error("Error al llamar a la API de OpenAI:", error);
    throw new Error("Error al procesar la solicitud a la API de OpenAI.");
  }
};
