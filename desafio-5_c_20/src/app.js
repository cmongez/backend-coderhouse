import express from 'express';
import session from 'express-session';
import productsRouter from './routes/api/products.router.js';
import cartsRouter from './routes/api/carts.router.js';
import __dirname from './utils.js';
import viewsRouter from './routes/web/views.router.js';
import sessionsRouter from './routes/web/sessions.router.js';
import handlebars from 'express-handlebars';
import Handlebars from 'handlebars';
import MongoStore from 'connect-mongo';

import path from 'path';
import mongoose from 'mongoose';

import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';

const app = express();

//MongoDB
mongoose.set('strictQuery', true);

try {
  await mongoose.connect(
    'mongodb+srv://cmongez:fzA2poG0aZM3NXdQ@ecommerce.t8ifwej.mongodb.net/test'
  );
} catch (error) {
  console.log(error);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

//Session
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        'mongodb+srv://cmongez:fzA2poG0aZM3NXdQ@ecommerce.t8ifwej.mongodb.net/test',
      mongoOptions: { useNewUrlParser: true },
      ttl: 3600,
    }),
    secret: 'secretCoder',
    resave: true,
    saveUninitialized: true,
  })
);

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
app.use('/api/sessions', sessionsRouter);

const server = app.listen(8080, () => console.log('Listening on 8080'));
