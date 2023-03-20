import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import __dirname from './utils.js';
import { Server } from 'socket.io';
import viewsRouter from './routes/views.router.js';
import handlebars from 'express-handlebars';
import Handlebars from 'handlebars';

import path from 'path';
import mongoose from 'mongoose';
import ProductManager from './daos/dbManager/products.dao.js';
import MessageManager from './daos/dbManager/messages.dao.js';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';

// const productsSocket = new ProductManager(
//   path.join(__dirname, 'productos.json')
// );
const productsSocket = new ProductManager();
const messageManager = new MessageManager();

const app = express();

//MongoDB
mongoose.set('strictQuery', true);

mongoose
  .connect(
    'mongodb+srv://cmongez:fzA2poG0aZM3NXdQ@ecommerce.t8ifwej.mongodb.net/test'
  )
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB: ', err);
  });
app.use(express.static(`${__dirname}/public`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Handlebars
app.engine(
  'handlebars',
  handlebars.engine({
    extname: 'handlebars',
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);

//Endpoints api
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

const server = app.listen(8080, () => console.log('Listening on 8080'));

export const io = new Server(server);
io.on('connection', async (socket) => {
  io.emit('mesagge');
  console.log('Server levantado con sockets');

  socket.emit('messages', await messageManager.getAll());
  socket.on('new_msg', async (data) => {
    await messageManager.save(data);
    io.sockets.emit('messages', await messageManager.getAll());
  });

  socket.on('addProduct', async (product) => {
    console.log('Nuevo-producto', product);

    const newProductId = await productsSocket.addProduct(product);

    const newProduct = await productsSocket.getProductById(newProductId);
    console.log('newProduct IDDD :>> ', newProduct);
    io.emit('productAdded', newProduct);
  });
  socket.on('deleteProductById', async (id) => {
    console.log(id);
    const idDeleted = await productsSocket.deleteProductById(id);
    console.log('idDeleted  :>> ', idDeleted._id.toString());
    io.emit('productDeleted', idDeleted._id.toString());
  });
});
