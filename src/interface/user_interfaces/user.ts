export interface IUser {
  _id: string;
  name: string;
  last_name: string;
  birthdate: string;
  gender: string;
  email: string;
  password: string;
  numerology: number;
  imagen_palm?: string;
  imagen_avatar?: string;
  created_at: Date;
  readings: string[];
}
