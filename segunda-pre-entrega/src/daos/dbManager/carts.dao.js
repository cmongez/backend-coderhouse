import { cartModel } from '../../models/cart.model.js';

class CartsManager {
  async createCart() {
    return await cartModel.create({ products: [] });
  }

  async getCartById(id) {
    return await cartModel.findById(id).populate('products.id');
  }

  async addProductToCart(cid, pid) {
    return await cartModel.findOneAndUpdate(
      { _id: cid },
      { $push: { products: { id: pid } } }
    );
  }

  async updateProductQuantity(cid, pid, quantity) {
    return await cartModel.findOneAndUpdate(
      { _id: cid, 'products.id': pid },
      { $set: { 'products.$.cantidad': quantity } },
      { new: true }
    );
  }

  async updateCart(cid, products) {
    return await cartModel.findOneAndUpdate(
      { _id: cid },
      { products },
      { new: true }
    );
  }

  async deleteProductFromCart(cid, pid) {
    return await cartModel.findOneAndUpdate(
      { _id: cid },
      { $pull: { products: { id: pid } } },
      { new: true }
    );
  }

  async deleteAllProductsFromCart(cid) {
    return await cartModel.findByIdAndUpdate(
      cid,
      { $set: { products: [] } },
      { new: true }
    );
  }
}

export default CartsManager;
