import { productModel } from '../../models/product.model.js';

class ProductManager {
  async getProducts() {
    return await productModel.find();
  }

  async getProductById(id) {
    return await productModel.findById(id);
  }

  async addProduct(data) {
    return await productModel.create(data);
  }

  async updateProduct(id, data) {
    return await productModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteProductById(id) {
    return await productModel.findByIdAndDelete(id);
  }
}

export default ProductManager;
