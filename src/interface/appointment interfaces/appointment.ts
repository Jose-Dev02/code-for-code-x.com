export interface IAppointment {
  _id: string;
  userId: string;
  assistantId: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  googleEventId: string;
}
