    
    window.onload = function () {
        const material = sessionStorage.getItem('material') || 'Não informado';
        const quantidade = sessionStorage.getItem('quantidade') || '0';
        const peso = sessionStorage.getItem('peso') || '0';
        const formaPagamento = sessionStorage.getItem('formaPagamento') || 'Não informado';
        const pagamento = sessionStorage.getItem('pagamento') || '0,00 R$';
        const endereco = sessionStorage.getItem('endereco') || 'Endereço não informado';
      
        document.getElementById('material').textContent = material;
        document.getElementById('quantidade').textContent = quantidade;
        document.getElementById('peso').textContent = peso;
        document.getElementById('formaPagamento').textContent = formaPagamento;
        document.getElementById('pagamento').textContent = pagamento;
        document.getElementById('endereco').textContent = endereco;
      };
    
      


      function confirmarCompra() {
        // Primeiro pega todos os pedidos existentes para pegar o último id
        fetch('http://localhost:3000/pedido')
          .then(res => res.json())
          .then(pedido => {

            
            // Pega o último id (ou zero se não existir)
            let ultimoId = pedido.length > 0 ? Number(pedido[pedido.length - 1].id) : 0;
      
            // Cria o novo pedido 
            const novoPedido = {
              id: (ultimoId + 1).toString(),
              material: document.getElementById('material').textContent,
              quantidade: document.getElementById('quantidade').textContent,
              peso: document.getElementById('peso').textContent,
              formaPagamento: document.getElementById('formaPagamento').textContent,
              pagamento: document.getElementById('pagamento').textContent,
              endereco: document.getElementById('endereco').textContent,

            };
      
            // Salva o pedido no json-server
            return fetch('http://localhost:3000/pedido', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(novoPedido)
            });
          })
          .then(response => {
            if (!response.ok) throw new Error('Erro ao confirmar pedido.');
            return response.json();
          })
          .then(data => {
            alert('Pedido confirmado com sucesso!');
            console.log('Pedido salvo:', data);

            window.location.href = 'registo.html';
          })
          .catch(error => {
            console.error('Erro ao confirmar compra: ', error);
            alert('Falha a confirmar pedido.');
          });
      }


        
  function voltar() {
    
    // Volta para a página anterior para corrigir erros.
    window.history.back(); 
  }
  
  function cancelar() {
    if (confirm('Tem certeza que deseja cancelar a compra?')) {
      sessionStorage.clear();

      //tem que arrumar pra voltar pra tela de usuario, onde o usuario escolhe ver as outras opções desse site
      window.location.href = 'index.html'; 
    }
  }
