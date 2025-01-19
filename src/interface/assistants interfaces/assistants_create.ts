export interface IAssistantCreate {
  name: string;
  last_name: string;
  email: string;
  rating: number;
  location: string;
  language: string[];
  calendarID: string;
  // reservation: string[];
}
