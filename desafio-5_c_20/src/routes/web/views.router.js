import { Router } from 'express';
import ProductManager from '../../daos/dbManager/products.dao.js';
import CartsManager from '../../daos/dbManager/carts.dao.js';

const router = Router();

const productManager = new ProductManager();
const cartsManager = new CartsManager();

const publicAccess = (req, res, next) => {
  if (req.session.user) return res.redirect('/products');
  next();
};

const privateAccess = (req, res, next) => {
  if (!req.session.user) return res.redirect('/login');
  next();
};

router.get('/register', publicAccess, (req, res) => {
  res.render('register');
});

router.get('/login', publicAccess, (req, res) => {
  res.render('login');
});

router.get('/', privateAccess, (req, res) => {
  res.render('profile', {
    user: req.session.user,
  });
});

//Products and Carts
router.get('/products', privateAccess, async (req, res) => {
  const { limit = 10, page = 1, sort, category, status } = req.query;

  const filter = {};
  if (category) {
    filter.category = category;
  }
  if (status) {
    filter.status = status;
  }

  try {
    const products = await productManager.getProducts(
      filter,
      sort,
      limit,
      page
    );

    res.render('products', {
      products,
      user: req.session.user,
    });
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
