import { Router } from 'express';
import __dirname from '../../utils.js';
import ProductManager from '../../daos/dbManager/products.dao.js';


const router = Router();

const productManager = new ProductManager();

router.get('/', async (req, res) => {
  //Verificamos si existen las querys
  let { limit = 10, page = 1, sort, query, category, status } = req.query;

  const filter = {};

  if (query) {
    filter.tipo = query;
  }
  try {
    const result = await productManager.getProducts(
      filter,
      sort,
      parseInt(limit),
      parseInt(page)
    );

    res
      .status(200)
      .json({ status: 'success', payload: result.products, ...result });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});


export default router;

