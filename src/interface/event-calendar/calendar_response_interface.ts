export interface ICalendarEventResponse {
    data: {
      kind: string;            // "calendar#event"
      etag: string;           // Identificador único de la versión del evento
      id: string;             // ID único del evento creado en Google Calendar
      status: string;         // Estado del evento (ej: "confirmed")
      htmlLink: string;       // URL para ver el evento en Google Calendar
      created: string;        // Fecha de creación (formato ISO)
      updated: string;        // Fecha de última actualización (formato ISO)
      summary: string;        // Título del evento
      description: string;    // Descripción del evento
      location: string;       // Ubicación del evento
      creator: {
        email: string;
        displayName?: string;
        self: boolean;
      };
      organizer: {
        email: string;
        displayName?: string;
        self: boolean;
      };
      start: {
        dateTime: string;     // Fecha y hora de inicio
        timeZone: string;     // Zona horaria
      };
      end: {
        dateTime: string;     // Fecha y hora de fin
        timeZone: string;     // Zona horaria
      };
      iCalUID: string;        // ID único para sincronización con iCal
      sequence: number;       // Número de versión del evento
      attendees?: Array<{     // Lista de asistentes (si hay)
        email: string;
        displayName?: string;
        responseStatus: string;
      }>;
      reminders: {
        useDefault: boolean;
        overrides?: Array<{
          method: string;
          minutes: number;
        }>;
      };
    };
    status: number;           // Código de estado HTTP
    statusText: string;       // Texto del estado HTTP
    headers: Record<string, string>; // Headers de la respuesta HTTP
  }


 export interface ICalendarListResponse {
    data: {
      kind: string;          // "calendar#events"
      etag: string;          // ETag para caché
      summary: string;       // Nombre del calendario
      description: string;   // Descripción del calendario
      updated: string;       // Última actualización del calendario
      timeZone: string;     // Zona horaria del calendario
      nextPageToken?: string; // Token para la siguiente página de resultados
      nextSyncToken?: string; // Token para sincronización
      items: Array<{        // Array de eventos
        kind: string;       // "calendar#event"
        etag: string;       // ETag del evento
        id: string;         // ID único del evento
        status: string;     // Estado del evento (confirmed, tentative, cancelled)
        htmlLink: string;   // URL para ver el evento
        created: string;    // Fecha de creación
        updated: string;    // Fecha de última actualización
        summary: string;    // Título del evento
        description?: string; // Descripción del evento
        location?: string;   // Ubicación
        creator: {
          email: string;
          displayName?: string;
          self: boolean;
        };
        organizer: {
          email: string;
          displayName?: string;
          self: boolean;
        };
        start: {
          dateTime: string; // Fecha y hora de inicio
          timeZone?: string;
        };
        end: {
          dateTime: string; // Fecha y hora de fin
          timeZone?: string;
        };
        attendees?: Array<{
          email: string;
          displayName?: string;
          responseStatus: string;
        }>;
        // ... otros campos del evento
      }>;
    };
    headers: Record<string, string>;
    status: number;
    statusText: string;
  }