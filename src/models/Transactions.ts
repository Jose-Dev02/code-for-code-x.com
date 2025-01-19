import { model, Schema, ObjectId } from "mongoose";

const TransactionSchema = new Schema({
  user_associated: {
    type: Object,
    default: {
      userID: Schema.ObjectId,
      name: String,
      last_name: String,
    },
  },
  transaction_status: {
    type: String,
    required: true,
  },
  id_product: {
    type: String,
    required: true,
  },
});

const Transaction = model("Transaction", TransactionSchema);

export default Transaction;
