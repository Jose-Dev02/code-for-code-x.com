import { ObjectId } from "mongoose";

export interface ICode_Verification {
  userId: ObjectId;
  code: string;
  expiration: Date;
}
