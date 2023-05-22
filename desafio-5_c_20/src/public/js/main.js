// Espera a que la página se cargue completamente
document.addEventListener('DOMContentLoaded', async function () {
  // Obtener el valor de cartId desde el localStorage
  const cartId = localStorage.getItem('cartId');

  const cartButton = document.querySelector('#cartButton');

  // Si cartId existe, actualiza el href del botón del carrito
  if (cartId) {
    const href = `/carts/${cartId}`;
    cartButton.href = href;
  } else {
    try {
      const response = await fetch('/api/carts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log('Retorno creacion carro primera vez', data);
      localStorage.setItem('cartId', data._id);

      const href = `/carts/${data._id}`;
      cartButton.href = href;
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  }
});

async function addProductToCart(cartId, productId) {
  const url = `/api/carts/${cartId}/products/${productId}`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log('Product added to cart:', data);
    return data;
  } catch (error) {
    console.error('Error adding product to cart:', error);
  }
}

async function buttonAdd(button) {
  //Obtenemos el id del producto
  const productId = button.getAttribute('pid');
  //Verificamos si ya existe un cartId
  const cartId = localStorage.getItem('cartId');

  //Traemos el carrito
  const cart = await fetch(`/api/carts/${cartId}`).then((res) => res.json());
  //Verificamos si el producto ya existe en el carrito
  const existingProduct = cart.products.find(
    (p) => p.product._id === productId
  );
  console.log('existing', existingProduct);

  if (existingProduct) {
    const newQuantity = existingProduct.quantity + 1;

    await fetch(`/api/carts/${cartId}/products/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity: newQuantity }),
    });
  } else {
    addProductToCart(cartId, productId);
  }
}

async function nextPage() {
  let params = new URLSearchParams(window.location.search);
  const activePage = parseInt(document.getElementById('page').innerHTML) || 1;

  params.set('page', activePage + 1);

  window.location.href = `/products?${params.toString()}`;
}

async function prevPage() {
  let params = new URLSearchParams(window.location.search);
  const activePage = parseInt(document.getElementById('page').innerHTML) || 1;

  params.set('page', activePage - 1);

  window.location.href = `/products?${params.toString()}`;
}
