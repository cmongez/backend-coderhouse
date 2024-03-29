import { Schema, model } from 'mongoose';

const cartCollection = 'carts';
const productSchema = new Schema(
  {
    id: { type: String, required: true },
    quantity: { type: Number, required: true, default: 1 },
  },
  { _id: false }
);

const cartSchema = new Schema({ products: [productSchema] });
export const cartModel = model(cartCollection, cartSchema);
