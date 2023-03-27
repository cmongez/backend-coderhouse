import { Router } from 'express';
import __dirname from '../../utils.js';
// import ProductManager from '../daos/fileManager/ProductManager.js';
// import CartsManager from '../daos/fileManager/CartsManager.js';
import ProductManager from '../../daos/dbManager/products.dao.js';
import CartsManager from '../../daos/dbManager/carts.dao.js';
import path from 'path';

const router = Router();

//Creamos la instancia de las clases
const cartsManager = new CartsManager();
const productManager = new ProductManager();

//Ruta /carts
//POST: Agrega un nuevo carrito.

router.post('/', async (req, res) => {
  const id = await cartsManager.createCart();
  res.json(id);
});

//Ruta /carts/:cid
//GET: Obtener carrito por id.

router.get('/:cid', async (req, res) => {
  const { cid } = req.params;
  const cart = await cartsManager.getCartById(cid);
  console.log(cart);
  res.json(cart);
});

// Ruta /carts/:cid
// PUT: Actualizar el carrito con un arreglo de productos.
router.put('/:cid', async (req, res) => {
  const { cid } = req.params;
  const products = req.body;
  const cart = await cartsManager.updateCart(cid, products);
  res.json(cart);
});

//Ruta /carts/:cid/product/:pid
//POST: Agregar producto al carrito por id.

router.post('/:cid/product/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const product = await productManager.getProductById(pid);
  if (product.id) {
    const cart = await cartsManager.addProductToCart(cid, pid);
    res.json(cart);
    return;
  }
  res.json({ msg: `El producto con el id ${pid} no existe.` });
});

// Ruta /carts/:cid/products/:pid
// PUT: Actualizar SÓLO la cantidad de ejemplares del producto.

router.put('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const { cantidad } = req.body;
  const cart = await cartsManager.updateProductQuantity(cid, pid, cantidad);
  res.json(cart);
});

// Ruta /carts/:cid/products/:pid
// DELETE: Eliminar del carrito el producto seleccionado.

router.delete('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const cart = await cartsManager.deleteProductFromCart(cid, pid);
  res.json(cart);
});

// Ruta /carts/:cid/products
// DELETE: Eliminar todos los productos del carrito.
router.delete('/:cid/products', async (req, res) => {
  const { cid } = req.params;
  const cart = await cartsManager.deleteAllProductsFromCart(cid);
  res.json(cart);
});

export default router;
