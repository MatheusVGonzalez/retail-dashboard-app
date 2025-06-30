const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get('id'), 10); // pega o ID da URL

fetch('http://localhost:3000/products')
  .then(res => res.json())
  .then(products => {
    const produto = products[id];
    if (!produto) {
      console.error('Produto não encontrado');
      return;
    }

    produto.id = id;


    document.getElementById('product-name').textContent = produto.nome;
    document.getElementById('product-image').src = produto.imagem;
    document.getElementById('product-image').alt = produto.nome;
    document.getElementById('product-description').textContent = produto.descricao || 'No description.';
    document.getElementById('product-price').textContent = `Price: $ ${produto.preco.toFixed(2)}`;
    document.getElementById('product-stock').textContent = `Remaining Items: ${produto.quantidade}`;



    document.getElementById('add-to-cart').addEventListener('click', () => adicionarAoCarrinho(produto));

    carregarAvaliacoes(id);
  })
  .catch(error => {
    console.error('Erro ao carregar produto:', error);
  });

function adicionarAoCarrinho(produto) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(produto);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Produto adicionado ao carrinho!');
produto.id = id; 
cart.push(produto);

}

function carregarAvaliacoes(idProduto) {
  fetch(`http://localhost:3000/reviews/${idProduto}`)
    .then(res => res.json())
    .then(reviews => {
      const container = document.getElementById('reviews-container');
      container.innerHTML = '';
      if (reviews.length === 0) {
        container.innerHTML = '<p>Seja o primeiro a avaliar!</p>';
        return;
      }

      reviews.forEach(r => {
        const review = document.createElement('div');
        review.className = 'review';
        review.innerHTML = `
          <div class="stars">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</div>
          <div class="comment">${r.comment}</div>
        `;
        container.appendChild(review);
      });
    })
    .catch(err => console.error('Erro ao carregar avaliações:', err));
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('review-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const stars = parseInt(document.getElementById('stars').value);
      const comment = document.getElementById('comment').value.trim();

      if (!stars || !comment) {
        alert('Preencha todos os campos');
        return;
      }

      fetch('http://localhost:3000/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: id,
          stars,
          comment
        })
      })
        .then(res => res.json())
        .then(() => {
          form.reset();
          carregarAvaliacoes(id);
        })
        .catch(err => console.error('Erro ao enviar avaliação:', err));
    });
  }
});
