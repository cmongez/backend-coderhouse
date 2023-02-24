import { Router } from 'express';
import ProductManager from '../ProductManager.js';
import __dirname from '../utils.js';
import path from 'path';
const router = Router();

const productManager = new ProductManager(
  path.join(__dirname, 'productos.json')
);

// router.get('/', (req, res) => {
//   res.render('index');
// });

router.get('', async (req, res) => {
  console.log('entre');

  const products = await productManager.getProducts();
  console.log(products);
  res.render('home', { products });
});

export default router;
