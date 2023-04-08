async function buttonAdd(button) {
  const productId = button.getAttribute('pid');
  console.log(productId)
  const productToAdd = { quantity: 1 };
  const cartId = localStorage.getItem('cartId');

  if (cartId) {
    const url = `/api/carts/${cartId}/products/${productId}`;
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productToAdd),
      });
      const data = await response.json();
      console.log('Product added to cart:', data);
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  } else {
    try {
      const response = await fetch('/api/carts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productToAdd),
      });
      const data = await response.json();
      localStorage.setItem('cartId', data._id);
      console.log('Product added to cart:', data);
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
