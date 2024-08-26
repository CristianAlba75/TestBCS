import { Schema } from 'mongoose';

export interface Product extends Document {
  name: string;
  isActive: boolean;
  description: string;
  code: string;
}

export const ProductSchema = new Schema<Product>({
  name: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true },
});
