const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.count = 0;
  }
  async getProducts() {
    if (fileExists(this.path)) {
      try {
        let products = await fs.promises.readFile(this.path, 'utf-8');
        return JSON.parse(products);
      } catch (error) {
        console.log(error);
        return [];
      }
    } else {
      console.log('El archivo que estas buscando no existe.');
    }
  }

  async addProduct(prod) {
    if (fileExists(this.path)) {
      try {
        for (const property in prod) {
          if (prod[property] === '') {
            throw Error(`Campo ${property} vacio`);
          }
        }

        let products = await this.getProducts();

        const codeExists = products.some(
          (product) => prod.code === product.code
        );

        if (codeExists) {
          throw Error('El code de ese producto ya existe');
        }

        let newId = (await products[products.length - 1].id) + 1;
        prod.id = newId;
        products.push(prod);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(products, null, 2)
        );
        return prod.id;
      } catch (error) {
        console.log(error);
        console.log('Error al guardar el producto');
      }
    } else {
      try {
        let products = [];
        prod.id = 1;
        products.push(prod);
        fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
        return prod.id;
      } catch (error) {
        console.log('Error al crear el archivo y guardar el producto');
      }
    }
  }

  async getProductById(id) {
    try {
      if (fileExists(this.path)) {
        let products = await this.getProducts();
        let prod = products.find((item) => item.id === id);

        if (prod !== undefined) {
          return prod;
        }
        throw Error('Not Found');
      } else {
        throw Error('Not Found');
      }
    } catch (error) {
      console.error(error);
    }
  }

  async deleteById(id) {
    if (fileExists(this.path)) {
      try {
        let products = await this.getProducts();
        let newProducts = products.filter((item) => item.id !== id);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(newProducts, null, 2)
        );
        console.log('Producto eliminado.');
        return;
      } catch (error) {
        console.log('Error al borrar el producto');
      }
    }
    console.log('No existe un archivo donde buscar.');
  }

  async updateProduct(id, data) {
    if (fileExists(this.path)) {
      let products = await this.getProducts();
      let prodIndex = products.findIndex((item) => item.id === id);

      console.log('ss', Object.keys(data).length), Object.keys(data);
      if (prodIndex !== -1) {
        let product = products[prodIndex];

        if (Object.keys(data).length > 1) {
          product = data;
          console.log('aqui', data);
        } else {
          let property = Object.keys(data)[0];
          let value = Object.values(data)[0];
          console.log(property, value);
          product[property] = value;
        }

        await fs.promises.writeFile(
          this.path,
          JSON.stringify(products, null, 2)
        );
        return product;
      }
      throw Error('Not Found');
    } else {
      throw Error('No existe un archivo donde buscar.');
    }
  }
}
//helpers

//Verifica si el archivo existe
const fileExists = (path) => {
  try {
    return fs.statSync(path).isFile();
  } catch (err) {
    return false;
  }
};

const instance = new ProductManager('products.txt');

(async () => {
  let products = await instance.getProducts();
  // let product = await instance.addProduct({
  //     title: 'producto prueba',
  //     description: 'Este es un producto prueba',
  //     price: 200,
  //     thumbnail: 'Sin imagen',
  //     code: 'abc123',
  //     stock: 25,
  // });
  // console.log('product', product);
  // let deleted = await instance.deleteById(1);
  // console.log(deleted);

  // console.log('getProductById(1)', await instance.getProductById(3));
  // console.log(
  //     'update(1)',
  //     await instance.updateProduct(2, {
  //         title: 'cesar',
  //         description: ' es un producto prueba',
  //         price: 400,
  //         thumbnail: 'Sin imagen',
  //         code: 'abc12',
  //         stock: 25,
  //     })
  // );
})();
