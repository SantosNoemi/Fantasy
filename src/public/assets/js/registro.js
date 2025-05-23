window.onload = function () {
    fetch('http://localhost:3000/pedido')
      .then(response => response.json())
      .then(pedidos => {
        const container = document.getElementById('listaPedidos');
  
        if (pedidos.length === 0) {
          container.innerHTML = '<p class="text-muted">Nenhum pedido encontrado.</p>';
          return;
        }
  
        pedidos.forEach(pedido => {
          const card = document.createElement('div');
          card.className = 'card mb-4 shadow-sm';
  
          card.innerHTML = `
            <div class="card-body">
              <h5 class="card-title">Pedido ${pedido.id}</h5>
              <div class="row">
                <div class="col-md-4"><strong>Material:</strong> ${pedido.material}</div>
                <div class="col-md-4"><strong>Quantidade:</strong> ${pedido.quantidade}</div>
                <div class="col-md-4"><strong>Peso:</strong> ${pedido.peso}</div>
                <div class="col-md-4"><strong>Forma de Pagamento:</strong> ${pedido.formaPagamento}</div>
                <div class="col-md-4"><strong>Pagamento:</strong> ${pedido.pagamento}</div>
                <div class="col-md-4"><strong>Endereço:</strong> ${pedido.endereco}</div>
              </div>
          `;
  
          container.appendChild(card);
        });
      })
      .catch(error => {
        console.error('Erro ao carregar pedidos:', error);
        document.getElementById('listaPedidos').innerHTML =
          '<p class="text-danger">Erro ao carregar os pedidos.</p>';
      });
  };