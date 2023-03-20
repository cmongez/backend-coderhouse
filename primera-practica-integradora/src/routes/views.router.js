import { Router } from 'express';
// import ProductManager from '../daos/fileManager/ProductManager.js';
import ProductManager from '../daos/dbManager/products.dao.js';

import __dirname from '../utils.js';
import path from 'path';
const router = Router();

const productManager = new ProductManager(
  path.join(__dirname, 'productos.json')
);

router.get('', async (req, res) => {
  const products = await productManager.getProducts();
  res.render('home', { products });
});

router.get('/realtimeproducts', async (req, res) => {
  const products = await productManager.getProducts();
  res.render('realTimeProducts', { products });
});

router.get('/chat', (req, res) => {
  res.render('chat');
});
export default router;
