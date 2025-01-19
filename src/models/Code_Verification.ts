import { model, Schema } from "mongoose";
import moment from "moment";

interface CodigoVerification extends Document {
  userEmail: string;
  code: string;
}

const Code_Verification_Schema = new Schema({
  userEmail: { type: String, required: true },
  code: String,
  created_at: { type: Date, default: Date.now },
});

Code_Verification_Schema.index({ created_at: 1 }, { expireAfterSeconds: 600 });

const Codigo_Verification = model<CodigoVerification>(
  "Code_Verification",
  Code_Verification_Schema
);

export default Codigo_Verification;
