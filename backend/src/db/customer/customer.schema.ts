import { model, Schema, Types } from 'mongoose';

export interface Customer extends Document {
  documentType: string;
  documentNumber: string;
  name: string;
  email: string;
  products: Types.ObjectId[];
}

export const CustomerSchema = new Schema<Customer>({
  documentType: { type: String, required: true },
  documentNumber: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
});
