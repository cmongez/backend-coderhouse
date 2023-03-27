// const socket = io();

// socket.on('message', console.log('Cliente conectado'));

// //------------------------------------------------------------------------------------

// const formAddProduct = document.getElementById('formAddProduct');
// formAddProduct.addEventListener('submit', (e) => {
//   e.preventDefault();

//   const productToAdd = {
//     title: document.getElementById('titulo').value,
//     description: document.getElementById('descripcion').value,
//     price: document.getElementById('precio').value,
//     thumbnail: document.getElementById('imagen').value,
//     code: document.getElementById('code').value,
//     stock: document.getElementById('stock').value,
//     category: document.getElementById('category').value,
//     status: document.getElementById('status').value,
//   };
//   socket.emit('addProduct', productToAdd);

//   socket.on('productAdded', (product) => {
//     console.log('El producto añadido es', product);

//     const productToRender = {
//       id: product._id,
//       title: product.title,
//       description: product.description,
//       price: product.price,
//       thumbnail: product.thumbnail,
//       code: product.code,
//       category: product.category,
//       stock: product.stock,
//       status: product.status,
//     };

//     const productTable = document.getElementById('product_table');

//     // Agregar cada producto nuevo
//     const productTemplate = `<tr>
//         <th scope="row" >{{id}}</th>
//         <th >{{title}}</th>
//         <th >{{description}}</th>
//         <th ><img class="imagen" src="{{thumbnail}}" alt=""></th>
//         <th >{{code}}</th>
//         <th >{{stock}}</th>
//         <th >{{category}}</th>
//         <th >{{status}}</th>
//         <th >{{price}}</th>
//         <th ><button onclick="deleteProduct('{{id}}')" class="btn btn-danger">X</button></th>

//         </tr>`;
//     const template = Handlebars.compile(productTemplate);
//     const productHTML = template(productToRender);

//     productTable.innerHTML += productHTML;
//   });
// });

// const deleteProduct = (id) => {
//   console.log('Producto a eliminar :>> ', id);
//   socket.emit('deleteProductById', id);
// };

// socket.on('productDeleted', (id) => {
//   console.log('Producto eliminado :>> ', id);
//   const productTable = document.getElementById('product_table');
//   const productToDelete = productTable.querySelector('[id="' + id + '"]');

//   if (productToDelete) {
//     productTable.removeChild(productToDelete);
//   }
// });
