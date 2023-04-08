import { Router } from 'express';
// import ProductManager from '../daos/fileManager/ProductManager.js';
import ProductManager from '../../daos/dbManager/products.dao.js';
import CartsManager from '../../daos/dbManager/carts.dao.js';

const router = Router();

const productManager = new ProductManager();
const cartsManager = new CartsManager();
router.get('/products', async (req, res) => {
  const { limit = 10, page = 1, sort, category, status } = req.query;

  const filter = {};
  if (category) {
    filter.category = category;
  }
  if (status) {
    filter.status = status;
  }
  const cartId = localStorage.getItem('cartId');

console.log('cartId', cartId)
  try {
    const products = await productManager.getProducts(
      filter,
      sort,
      limit,
      page
    );
    console.log(products);
    const cartId = localStorage.getItem('cartId');
    console.log(cartId)
    res.render('products', products);
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

router.get('/products/:id', async (req, res) => {
  const product = await productManager.getProductById(req.params.id);

  res.render('productDetails', { product });
});

router.get('/carts/:cid', async (req, res) => {
  const cart = await cartsManager.getCartById(req.params.cid);

  console.log(cart);

  res.render('cart', { cart });
});

export default router;

// router.get('', async (req, res) => {
//   const products = await productManager.getProducts();
//   res.render('home', { products });
// });

// router.get('/realtimeproducts', async (req, res) => {
//   console.log('entre');
//   const products = await productManager.getProducts();
//   res.render('realTimeProducts', { products });
// });

// router.get('/chat', (req, res) => {
//   res.render('chat');
// });
