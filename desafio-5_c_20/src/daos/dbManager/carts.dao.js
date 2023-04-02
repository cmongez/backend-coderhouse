import { cartModel } from '../../models/cart.model.js';

class CartsManager {
  async createCart() {
    try {
      return await cartModel.create({ products: [] });
    } catch (error) {
      throw new Error(`Error creating cart: ${error.message}`);
    }
  }

  async getCartById(id) {
    try {
      return await cartModel.findById(id).populate('products.id');
    } catch (error) {
      throw new Error(`Error getting cart: ${error.message}`);
    }
  }

  async addProductToCart(cid, pid) {
    try {
      return await cartModel.findOneAndUpdate(
        { _id: cid },
        { $push: { products: { id: pid } } }
      );
    } catch (error) {
      throw new Error(`Error adding product to cart: ${error.message}`);
    }
  }

  async updateProductQuantity(cid, pid, quantity) {
    try {
      return await cartModel.findOneAndUpdate(
        { _id: cid, 'products.id': pid },
        { $set: { 'products.$.cantidad': quantity } },
        { new: true }
      );
    } catch (error) {
      throw new Error(`Error updating product quantity: ${error.message}`);
    }
  }

  async updateCart(cid, products) {
    try {
      return await cartModel.findOneAndUpdate(
        { _id: cid },
        { products },
        { new: true }
      );
    } catch (error) {
      throw new Error(`Error updating cart: ${error.message}`);
    }
  }

  async deleteProductFromCart(cid, pid) {
    try {
      return await cartModel.findOneAndUpdate(
        { _id: cid },
        { $pull: { products: { id: pid } } },
        { new: true }
      );
    } catch (error) {
      throw new Error(`Error deleting product from cart: ${error.message}`);
    }
  }

  async deleteAllProductsFromCart(cid) {
    try {
      return await cartModel.findByIdAndUpdate(
        cid,
        { $set: { products: [] } },
        { new: true }
      );
    } catch (error) {
      throw new Error(`Error deleting all products from cart: ${error.message}`);
    }
  }
}

export default CartsManager;