import { Schema, model } from 'mongoose';

const cartCollection = 'carts';
const productSchema = new Schema(
  {
    id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, default: 1 },
  },
  { _id: false }
);

const cartSchema = new Schema({ products: [productSchema] });
export const cartModel = model(cartCollection, cartSchema);
