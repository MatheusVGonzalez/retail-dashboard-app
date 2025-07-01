const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get('id'), 10);

fetch('http://localhost:3000/products')
  .then(res => res.json())
  .then(products => {
    const produto = products.find(p => p.id === id);
    

    if (!produto) {
      console.log(id);
      console.error('Product not found');
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

    carregarMediaAvaliacoes(id); 
    carregarAvaliacoes(id);
  })
  .catch(error => {
    console.error('Error loading product:', error);
  });

function adicionarAoCarrinho(produto) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(produto);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Product added to cart!');
}

function carregarMediaAvaliacoes(idProduto) {
  fetch(`http://localhost:3000/reviews/${idProduto}`)
    .then(res => res.json())
    .then(reviews => {
      const ratingDiv = document.getElementById('product-rating');
      if (!reviews.length) {
        ratingDiv.innerHTML = 'No ratings yet';
        return;
      }
      const avg = reviews.reduce((sum, r) => sum + r.stars, 0) / reviews.length;
      const rounded = Math.round(avg * 10) / 10;
      const fullStars = Math.floor(rounded);
      const halfStar = rounded - fullStars >= 0.5 ? 1 : 0;
      const emptyStars = 5 - fullStars - halfStar;
      ratingDiv.innerHTML =
        `${'★'.repeat(fullStars)}${halfStar ? '½' : ''}${'☆'.repeat(emptyStars)} <span style="color:#333;font-size:0.9em">(${rounded})</span>`;
    })
    .catch(() => {
      document.getElementById('product-rating').innerHTML = 'No ratings yet';
    });
}

function carregarAvaliacoes(idProduto) {
  fetch(`http://localhost:3000/reviews/${idProduto}`)
    .then(res => res.json())
    .then(reviews => {
      const container = document.getElementById('reviews-container');
      container.innerHTML = '';
      if (reviews.length === 0) {
        container.innerHTML = '<p>Be the first to review!</p>';
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
    .catch(err => console.error('Error loading reviews:', err));
}

function showPopup(msg, success = true) {
  const popup = document.createElement('div');
  popup.textContent = msg;
  popup.style.position = 'fixed';
  popup.style.top = '20px';
  popup.style.right = '20px';
  popup.style.background = success ? '#4caf50' : '#f44336';
  popup.style.color = '#fff';
  popup.style.padding = '12px 24px';
  popup.style.borderRadius = '8px';
  popup.style.zIndex = 9999;
  document.body.appendChild(popup);
  setTimeout(() => popup.remove(), 2000);
}

const form = document.getElementById('review-form');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const stars = parseInt(document.getElementById('stars').value);
    const comment = document.getElementById('comment').value.trim();

    if (!stars || !comment) {
      showPopup('Please fill in all fields', false);
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
      .then(res => {
        if (!res.ok) throw new Error('Error submitting review');
        return res.json();
      })
      .then(data => {
        if (data.success) {
          form.reset();
          carregarAvaliacoes(id);
          carregarMediaAvaliacoes(id);
          showPopup('Submitted', true);
        } else {
          showPopup('Error submitting review', false);
        }
      })
      .catch(err => {
        showPopup('Error submitting review', false);
        console.error('Error submitting review:', err);
      });
  });
}
