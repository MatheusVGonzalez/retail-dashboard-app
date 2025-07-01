let products = [];
let sales = {}; // {productId: count}
let reviews = [];

function fetchAll() {
  return Promise.all([
    fetch('http://localhost:3000/products').then(r => r.json()),
    fetch('http://localhost:3000/reviews/0').then(r => r.json()), // We'll fetch all reviews below
  ]).then(([prods]) => {
    products = prods;
    // Fetch all reviews for all products
    return Promise.all(products.map(p =>
      fetch(`http://localhost:3000/reviews/${p.id}`).then(r => r.json())
    ));
  }).then(allReviews => {
    reviews = allReviews;
    // Simulate sales: count of reviews as sales (or use your own sales data)
    sales = {};
    products.forEach((p, i) => sales[p.id] = reviews[i].length);
    renderCharts();
    fillProductSelect();
  });
}

function renderCharts() {
  // Stock Chart
  const stockCtx = document.getElementById('stockChart').getContext('2d');
  new Chart(stockCtx, {
    type: 'bar',
    data: {
      labels: products.map(p => p.nome),
      datasets: [{
        label: 'Stock',
        data: products.map(p => p.quantidade),
        backgroundColor: '#1a73e8'
      }]
    }
  });

  // Sales Chart
  const salesCtx = document.getElementById('salesChart').getContext('2d');
  new Chart(salesCtx, {
    type: 'bar',
    data: {
      labels: products.map(p => p.nome),
      datasets: [{
        label: 'Sales (by reviews count)',
        data: products.map(p => sales[p.id] || 0),
        backgroundColor: '#43a047'
      }]
    }
  });

  // Review Sentiment Chart
  const keywordsPositive = /great|good|excellent|amazing|love|perfect|awesome|best|like|great/i;
  const keywordsNegative = /bad|disappoint|broken|poor|worst|hate|problem|rate|terrible/i;
  let positive = 0, negative = 0, neutral = 0;
  reviews.flat().forEach(r => {
    if (keywordsPositive.test(r.comment)) positive++;
    else if (keywordsNegative.test(r.comment)) negative++;
    else neutral++;
  });
  const reviewCtx = document.getElementById('reviewChart').getContext('2d');
  new Chart(reviewCtx, {
    type: 'doughnut',
    data: {
      labels: ['Positive', 'Negative', 'Neutral'],
      datasets: [{
        data: [positive, negative, neutral],
        backgroundColor: ['#43a047', '#e53935', '#fbc02d']
      }]
    }
  });
}

function fillProductSelect() {
  const select = document.getElementById('productSelect');
  select.innerHTML = '';
  products.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.id;
    opt.textContent = p.nome;
    select.appendChild(opt);
  });
}

document.getElementById('increaseBtn').onclick = function() {
  const id = Number(document.getElementById('productSelect').value);
  const amount = Number(document.getElementById('increaseAmount').value);
  const msgDiv = document.getElementById('increase-msg');
  fetch('http://localhost:3000/products')
    .then(r => r.json())
    .then(products => {
      const product = products.find(p => p.id === id);
      if (!product) {
        msgDiv.textContent = 'Product not found';
        msgDiv.style.color = '#e53935';
        return;
      }
      product.quantidade += amount;
      return fetch('http://localhost:3000/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(products)
      });
    })
    .then(res => {
      if (res && res.ok) {
        msgDiv.textContent = 'Stock increased!';
        msgDiv.style.color = '#43a047';
        // Atualiza os gráficos sem reload
        fetchAll();
      }
    });
};

fetchAll();