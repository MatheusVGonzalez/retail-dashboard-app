let allProducts = [];

function renderProducts(products) {
  const list = document.getElementById('product-list');
  list.innerHTML = '';
  products.forEach(product => {
    list.innerHTML += `
      <div class="product-card" onclick="window.location.href='product.html?id=${product.id}'">
        <img src="${product.imagem}" alt="${product.nome}" />
        <div class="product-name">${product.nome}</div>
        <div class="product-price">$ ${product.preco.toFixed(2)}</div>
      </div>
    `;
  });
}

function fetchAndRenderProducts() {
  fetch('http://localhost:3000/products')
    .then(res => res.json())
    .then(products => {
      allProducts = products;
      renderProducts(products);
    });
}

document.addEventListener('DOMContentLoaded', () => {
  fetchAndRenderProducts();

  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', function () {
    const query = this.value.toLowerCase();
    const filtered = allProducts.filter(p =>
      p.nome.toLowerCase().includes(query) ||
      (p.descricao && p.descricao.toLowerCase().includes(query))
    );
    renderProducts(filtered);
  });
});