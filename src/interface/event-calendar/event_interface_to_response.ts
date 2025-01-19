import { calendar_v3 } from "googleapis/build/src/apis/calendar/v3";

export interface IEvent_Response {
    id: string | null | undefined;
    title: string | null | undefined;
    description: string | null | undefined;
    location: string | null | undefined;
    startDate: calendar_v3.Schema$EventDateTime | undefined;
    endDate: calendar_v3.Schema$EventDateTime | undefined;
  }