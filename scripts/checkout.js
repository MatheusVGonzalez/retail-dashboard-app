function finalizarCompra(produtoId, quantidade) {
  fetch('http://localhost:3000/comprar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId: produtoId, quantidadeComprada: quantidade })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      alert('Compra concluída com sucesso!');
      localStorage.removeItem('cart');
    } else {
      alert('Erro na compra: ' + data.error);
    }
  })
  .catch(err => console.error('Erro ao finalizar compra:', err));
}
