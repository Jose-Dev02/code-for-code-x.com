
import { google } from "googleapis";
import {config} from '../config';
import { IEvent_CalendarUse } from "../interface/event-calendar/event_interface";
import path from "path";

const jwtClient = new google.auth.JWT({
   email: config.googleJWT.GOOGLE_CLIENT_EMAIL,
   key: config.googleJWT.GOOGLE_PRIVATE_KEY,
   scopes: config.googleJWT.SCOPES
    
});



const keyFile = path.resolve(__dirname, "../../account_service_calendar.json");

const auth = new google.auth.GoogleAuth({
  keyFile: keyFile,
  scopes: config.googleJWT.SCOPES,
});

const calendar =  google.calendar({
    version: 'v3',
    auth: jwtClient
});


export const GetEventList = async (pageToken: string | undefined, calendarID: string) =>  await calendar.events.list({
    calendarId: calendarID,
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    orderBy: 'startTime',
    singleEvents: true,
    pageToken: pageToken,
  });

export const GetEventById = async (calendarID: string, eventID: string) => await calendar.events.get({
  calendarId: calendarID,
  eventId: eventID
})

export const CreateEvent = async (event: IEvent_CalendarUse,calendarID:string) =>  await calendar.events.insert({
      auth: jwtClient,
      calendarId: calendarID,
      // maxAttendees: 2,
      sendUpdates: 'all',
      sendNotifications: true,
      requestBody: event,

    })
  
    
