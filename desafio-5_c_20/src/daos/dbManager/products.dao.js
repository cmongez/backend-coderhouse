import { productModel } from '../../models/product.model.js';

class ProductManager {
  async getProducts(filter = {}, sort = '', limit = 0, page = 0) {
    try {
      
    let query = productModel.find(filter);
    // Ordenamiento
    if (sort) {
      const sortOption = {};
      sortOption[sort] = 1;
      query = query.sort(sortOption);
    }
    // Paginación
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
        status: 'success',
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
    return {
      status: 'success',
      payload: await query,
    };

    } catch (error) {
      console.error('Error in getProducts:', err);
      throw err;
    }
  }

  async getProductById(id) {
    try {
      return await productModel.findById(id);
    } catch (err) {
      console.error('Error in getProductById:', err);
      throw err;
    }
  }

  async addProduct(data) {
    try {
      const existingProduct = await productModel.findOne({ code: data.code });
      if (existingProduct) {
        throw new Error(`El producto con el código ${data.code} ya existe`);
      }
      return await productModel.create(data);
    } catch (err) {
      console.error('Error in addProduct:', err);
      throw err;
    }
  }

  async updateProduct(id, data) {
    try {
      return await productModel.findByIdAndUpdate(id, data, { new: true });
    } catch (err) {
      console.error('Error in updateProduct:', err);
      throw err;
    }
  }

  async deleteProductById(id) {
    try {
      return await productModel.findByIdAndDelete(id);
    } catch (err) {
      console.error('Error in deleteProductById:', err);
      throw err;
    }
  }
  }

export default ProductManager;
