const produtos = [
  { nome: 'Quoted Tech Clarity Gaming Custom PC', preco: 1349.99, imagem: '/assets/gamer1.webp' },
  { nome: 'ViprTech Reaper 3.0 Liquid-Cooled PC', preco: 2200.00, imagem: '/assets/vipr.webp' },
  { nome: 'ASUS ROG G700 Gaming PC', preco: 2700.99, imagem: '/assets/asusrog.webp' },
  { nome: 'UNIWAY Gaming PC Desktop', preco: 1649.99, imagem: '/assets/gamer2.webp' },
  { nome: 'ASUS ROG G700 Gaming PC', preco: 5999.99, imagem: '/assets/rog.webp' },
  { nome: 'Apple iMac 27"', preco: 1299.99, imagem: '/assets/imac.webp' },
  { nome: 'Apple MacBook Pro 16-inch"', preco: 1000.00, imagem: '/assets/mac.webp' },
  { nome: 'Lenovo Yoya Slim 7x14.5" OLED Copilot', preco: 1299.95, imagem: '/assets/lenovo.webp' },
  { nome: 'Asus TUF Gaming F15 144hz', preco: 1349.99, imagem: '/assets/asus.webp' },
  { nome: 'HP Omnibook 5 Flip 14', preco: 899.99, imagem: '/assets/hp.webp' },
  { nome: 'HP 14" x360 Chromebook Plus "', preco: 499.00, imagem: '/assets/chromebook.webp' },
];

function renderProdutos() {
  const container = document.getElementById('product-list');
  console.log(container);
  if (!container) return;
  produtos.forEach((p, i) => {
    const html = `
      <a href="product.html?id=${i}" class="product-card" style="text-decoration: none; color: inherit;">
        <img src="${p.imagem}" alt="${p.nome}" />
        <div class="product-name">${p.nome}</div>
        <div class="product-price">$ ${p.preco.toFixed(2)}</div>
      </a>
    `;
    container.innerHTML += html;
  });
}

document.addEventListener('DOMContentLoaded', renderProdutos);
