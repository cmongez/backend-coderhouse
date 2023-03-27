async function buttonAdd(obj) {
  const pid = obj.getAttribute('pid');
  console.log(pid);
  // Aquí puedes agregar el código para hacer la llamada a la API y agregar el producto al carrito
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
