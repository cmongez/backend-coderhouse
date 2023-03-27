import { productModel } from '../../models/product.model.js';

class ProductManager {
  async getProducts(filter = {}, sort = '', limit = 0, page = 0) {
    let query = productModel.find(filter);

    if (sort) {
      const sortOption = {};
      sortOption[sort] = 1;
      query = query.sort(sortOption);
    }

    if (limit && page) {
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      query = query.skip(startIndex).limit(limit);

      const count = await productModel.countDocuments(filter);
      const totalPages = Math.ceil(count / limit);
      const hasPrevPage = page > 1;
      const hasNextPage = page < totalPages;
      const prevPage = hasPrevPage ? page - 1 : null;
      const nextPage = hasNextPage ? page + 1 : null;
      const prevLink = hasPrevPage
        ? `?limit=${limit}&page=${prevPage}&sort=${sort}`
        : null;
      const nextLink = hasNextPage
        ? `?limit=${limit}&page=${nextPage}&sort=${sort}`
        : null;

      return {
        payload: await query,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        prevLink,
        nextLink,
        page: parseInt(page),
      };
    }

    return await query;
  }

  async getProductById(id) {
    return await productModel.findById(id);
  }

  async addProduct(data) {
    const existingProduct = await productModel.findOne({ code: data.code });
    if (existingProduct) {
      throw new Error(`El producto con el código ${data.code} ya existe`);
    }
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
