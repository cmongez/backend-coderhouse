async function addProductToCart  (cartId,productId){
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
    return data
  } catch (error) {
    console.error('Error adding product to cart:', error);
  }

}

async function buttonAdd(button) {
  //Obtenemos el id del producto
  const productId = button.getAttribute('pid');
  console.log(productId)
  //Verificamos si ya existe un cartId
  const cartId = localStorage.getItem('cartId');

  if (cartId) {
    //Traemos el carrito
    const cart = await fetch(`/api/carts/${cartId}`).then((res) => res.json());
    console.log("CART",cart)
    //Verificamos si el producto ya existe en el carrito
    const existingProduct = cart.products.find((p) => p.product._id === productId);
    console.log("existing",existingProduct)

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
  } else {
    try {
      const response = await fetch('/api/carts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log("Retorno creacion carro primera vez", data)
      localStorage.setItem('cartId', data._id);

      const productAdded = await addProductToCart(data._id, productId);

      console.log('Product added to cart:', productAdded);
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
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
