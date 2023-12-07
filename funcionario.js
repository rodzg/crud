document.addEventListener('DOMContentLoaded', function () {
  const formFuncionario = document.getElementById('formFuncionario');

  formFuncionario.addEventListener('submit', async function (event) {
    event.preventDefault();

    const nome = document.getElementById('nomeFuncionario').value;
    const cargo = document.getElementById('cargoFuncionario').value;
    const salario = document.getElementById('salarioFuncionario').value;

    try {
      const response = await fetch('/api/funcionarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, cargo, salario }),
      });

      if (response.ok) {
        // Limpar o formulário ou redirecionar para a página desejada
        formFuncionario.reset();
        alert('Funcionário cadastrado com sucesso!');
      } else {
        const errorData = await response.json();
        alert(`Erro ao cadastrar funcionário: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Erro de rede:', error);
      alert('Erro de conexão, tente novamente mais tarde.');
    }
  });
});
