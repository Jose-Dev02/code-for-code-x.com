const env = {
  CLAVE_SECRETA: "Jose_Dev_2025_secret",
  PUERT0: 3900,
  CONNECTION_STRING: "mongodb://localhost:27017/<Poner tu BD>",
  

  NAMEAPP: "Jose_Dev",

  EMAIL: {
    host: "smtppro.zoho.com",
    port: 465,
    secure: true,
    user: "hello@astropalmapp.com",
    password: "Difficul_21DE12",
  },

  //GPT
  openAI: {
    api_key:
      "solicitar una en el pagina oficial",
    organization_id: "solicitar en la pagina oficial",
    project_id: "solicitar en la pagina oficial",

    model: "gpt-4o-mini",
    store: true,
  },

  //GoogleJWT
  GoogleAuthJWT: {
    SCOPES: [
      "https://www.googleapis.com/auth/calendar",
      "https://www.googleapis.com/auth/calendar.events",
    ],
    GOOGLE_PRIVATE_KEY:
      "solicitar en el sitio oficial",
    GOOGLE_CLIENT_EMAIL:
      "crear en el sitio oficial",
    GOOGLE_PROJECT_NUMBER: "crear en el sitio oficial",
    GOOGLE_CALENDAR_ID:
      "crear en el sitio oficial",
  },
};

export const config = {
  clave_secreta: env.CLAVE_SECRETA,
  puerto: env.PUERT0,
  connection_string: env.CONNECTION_STRING,

  nameapp: env.NAMEAPP,

  openAi: env.openAI,
  email: env.EMAIL,

  googleJWT: env.GoogleAuthJWT
};
