import { Request, Response } from "express";
import { IAppointment_Create } from "../interface/appointment interfaces/appointment_create";
import { appointment_validator } from "../validators/appointmets_validator";
import { retrys } from "../utils/retrys_querys";
import Assistant from "../models/Assistant";
import User from "../models/User";
import { IAssistant } from "../interface/assistants interfaces/assistants";
import { IUser } from "../interface/user_interfaces/user";
import { CreateEvent, GetEventList, GetEventById } from '../services/google_calendar';
import { IEvent_CalendarUse } from "../interface/event-calendar/event_interface";
import Appointment from "../models/Appointment";
import { IEvent_Response } from "../interface/event-calendar/event_interface_to_response";
import { IAppointment } from "../interface/appointment interfaces/appointment";



const createAppointment = async (req: Request, res: Response) => {
  const appointment: IAppointment_Create | null =
    req.body as unknown as IAppointment_Create;

  const valid_appointment = appointment_validator(appointment);

  if (!valid_appointment.isValid) {
    return res
      .status(400)
      .json({ status: "error", message: valid_appointment.message });
  }

  try {
    const assistantResponse = await retrys(() =>
      Assistant.findById(appointment.assistantId)
    );
    const userResponse = await retrys(() => User.findById(appointment.userId));

    const typedAssistantResponse = assistantResponse as IAssistant | null;
    const typeduserResponse = userResponse as IUser | null;

    if (!typedAssistantResponse || !typeduserResponse) {
      return res.status(400).send({ status: "error", message: "BAD_REQUEST" });
    } else {
      const event: IEvent_CalendarUse = {
        summary: appointment.title,
        description: appointment.description,
        location: appointment.location,
        start: {
          dateTime: appointment.startDate,
          timeZone: "UTC",
        },
        end: {
          dateTime: appointment.endDate,
          timeZone: "UTC",
        },
        // attendees: [
        //   {
        //     id: typeduserResponse._id,
        //     email: typeduserResponse.email,
        //     displayName: `${typeduserResponse.name} ${typeduserResponse.last_name}`,
        //   },
        //   {
        //     id: typedAssistantResponse._id,
        //     email: typedAssistantResponse.email,
        //     displayName: `${typedAssistantResponse.name} ${typedAssistantResponse.last_name}`,
        //   },
        // ],
      };
      const response_calendar = await CreateEvent(event, typedAssistantResponse.calendarID);



      appointment.googleEventId = response_calendar.data.id ? response_calendar.data.id : '' ;

      const appointment_to_save = new Appointment(appointment);

      const response = await retrys(() => appointment_to_save.save());

      if (!response)
        return res.status(500).send({
          status: "error",
          message: "An error occurred while querying the database",
        });

      //Agregar correo para notificar

      return res.status(200).json({ status: "success" });
    }
  } catch (error) {
    return res.status(500).send({ status: "error", message: error });
  }
}

const getEventsFromCalendarID = async (req: Request, res: Response) => {

    const { id_assistant } = req.params;
    try {
        const response_assistant = await retrys(()=> Assistant.findById(id_assistant));
        const typeResponse_assistant = response_assistant as IAssistant | null

        if(!typeResponse_assistant){
        return res.status(400).send({ status: "error", message: "BAD_REQUEST" });
        }else{
            let pageToken: string | undefined;
            const Events = [];
            do {
              const response_events = await GetEventList(pageToken, typeResponse_assistant.calendarID);

              if(response_events.data.items?.length) Events.push(...response_events.data.items);

              pageToken = response_events.data.nextPageToken ?  response_events.data.nextPageToken : undefined ;
            } while (pageToken);

            const events_to_show_front: IEvent_Response[] = [];

            Events.map(event => {
              events_to_show_front.push({
                id: event.id,
                title: event.summary,
                description: event.description,
                location: event.location,
                startDate: event.start,
                endDate: event.end
              })
            })
            
            return res.status(200).json({status: 'status', events: events_to_show_front})
        }
    } catch (error) {
      return res.status(500).send({
        status: "error",
        message: "An error occurred while querying the database",
      });
    }

    
}

const getAppointmentsById = async (req: Request, res: Response) => {
  const { id_appointment} = req.params;

  try {
    const response_appointment = await retrys(() => Appointment.findById(id_appointment));

    const typedResponse_appointment =
      response_appointment as IAppointment | null;

    if (!typedResponse_appointment) {
      return res.status(404).json({ stauts: "error", message: "NOT FOUND" });
    }
    const response_assistant = await retrys(() =>
      Assistant.findById(typedResponse_appointment.assistantId)
    );

    const typepedResponse_assistant = response_assistant as IAssistant | null;

    if (!typepedResponse_assistant) {
      return res.status(404).json({ status: "status", message: "NOT FOUND" });
    }
    const event = await GetEventById(
      typepedResponse_assistant.calendarID,
      typedResponse_appointment.googleEventId
    );

    if (!event.data) {
      return res.status(404).json({ status: "error", message: "NOT FOUND" });
    }
    const event_to_show: IEvent_Response = {
      id: event.data.id,
      title: event.data.summary,
      description: event.data.description,
      location: event.data.location,
      startDate: event.data.start,
      endDate: event.data.end,
    };

    return res.status(200).json({ status: "success", message: event_to_show });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "An error occurred while querying the database",
    });
  }
};


export default {
  createAppointment,
  getEventsFromCalendarID,
  getAppointmentsById
}