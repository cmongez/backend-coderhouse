import { cartModel } from '../../models/cart.model.js';

class CartsManager {
  async createCart() {
    return await cartModel.create({ products: [] });
  }

  async getCartById(id) {
    return await cartModel.findById(id);
  }

  async addProductToCart(cid, pid) {
    return await cartModel.findOneAndUpdate(
      { _id: cid },
      { $push: { products: { id: pid } } }
    );
  }
}

export default CartsManager;
