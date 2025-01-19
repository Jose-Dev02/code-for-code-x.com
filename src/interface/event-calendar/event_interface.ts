import { calendar_v3 } from "googleapis";

export interface IEvent_CalendarUse extends calendar_v3.Schema$Event {
  summary: string;
  description: string;
  location: string;
  start: {
    // date?: string;
    dateTime?: string;
    timeZone: string;
  };
  end: {
    // date?: string;
    dateTime?: string;
    timeZone: string;
  };
  // attendees: {
  //   id: string;
  //   email: string;
  //   displayName: string;
    //   organizer: boolean;
    //   self: boolean;
    //   resource: boolean;
    //   optional: boolean;
    //   responseStatus: string;
    //   comment: string;
    //   additionalGuests: number;
  // }[];
}
