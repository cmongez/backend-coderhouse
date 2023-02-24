import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import __dirname from './utils.js';
import { Server } from 'socket.io';
import viewsRouter from './routes/views.router.js';
import handlebars from 'express-handlebars';

const app = express();

app.use(express.static(`${__dirname}/public`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);

//Endpoints api
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

const server = app.listen(8080, () => console.log('Listening on 8080'));

const io = new Server(server);

io.on('connection', (socket) => {
  console.log('Nuevo cliente');

  socket.on('message', (data) => console.log(data));

  socket.emit(
    'evento_socket-individual',
    'Este mensaje solo lo debe recibir el socket individual'
  );
  socket.broadcast.emit(
    'evento_todos_menos_actual',
    'Lo veran todos menos el que envio el mensaje'
  );
  io.emit('evento_todos', 'Lo recibiran todos los sockets');
});
