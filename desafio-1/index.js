class ProductManager {
  constructor() {
    this.products = [];
    this.count = 0;
  }
  getProducts = () => {
    return this.products;
  };
  addProduct = (obj) => {
    for (const property in obj) {
      if (obj[property] === '') {
        throw Error(`Campo ${property} vacio`);
      }
    }

    const codeExists = this.products.some(
      (product) => obj.code === product.code
    );

    if (!codeExists) {
      this.count++;
      obj.id = this.count;
      this.products.push(obj);
      console.log('Producto creado con exito');
      return obj.id;
    }

    throw Error('El code de ese producto ya existe');
  };
  getProductById = (id) => {
    const product = this.products.find((product) => id === product.id);
    if (product) {
      return product;
    }
    throw Error('Not Found');
  };
}

const instance = new ProductManager();
console.log('instance.getProducts();', instance.getProducts());

instance.addProduct({
  title: 'producto prueba',
  description: 'Este es un producto prueba',
  price: 200,
  thumbnail: 'Sin imagen',
  code: 'abc123',
  stock: 25,
});

console.log('instance.getProducts();', instance.getProducts());

// instance.addProduct({
//   title: 'producto prueba',
//   description: 'Este es un producto prueba',
//   price: 200,
//   thumbnail: 'Sin imagen',
//   code: 'abc123',
//   stock: 25,
// });

// console.log('instance.getProductById(1)', instance.getProductById(1));
// console.log('instance.getProductById(4)', instance.getProductById(4));
