document.addEventListener('DOMContentLoaded', () => {
    const id = new URLSearchParams(window.location.search).get('id');
    const form = document.querySelector('#formEditarCliente');

    // Verifica se o ID do cliente foi fornecido
    if (!id) {
        alert('ID do cliente não fornecido');
        return;
    }

    // Função para carregar os dados do cliente
    async function carregarCliente() {
        try {
            const response = await fetch(`http://localhost:8080/clientes/${id}`);
            if (!response.ok) throw new Error('Erro ao buscar cliente');

            const cliente = await response.json();
            document.querySelector('#clienteId').value = cliente.id;
            document.querySelector('#nome').value = cliente.nome;
            document.querySelector('#telefone').value = cliente.telefone;
            document.querySelector('#email').value = cliente.email;
            document.querySelector('#endereco').value = cliente.endereco;
            document.querySelector('#dataNascimento').value = cliente.dataNascimento.split('T')[0];
        } catch (error) {
            console.error('Erro:', error);
        }
    }

    // Função para atualizar os dados do cliente
    async function atualizarCliente() {
        try {
            const response = await fetch(`http://localhost:8080/clientes/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: document.querySelector('#clienteId').value,
                    nome: document.querySelector('#nome').value,
                    telefone: document.querySelector('#telefone').value,
                    email: document.querySelector('#email').value,
                    endereco: document.querySelector('#endereco').value,
                    dataNascimento: document.querySelector('#dataNascimento').value
                })
            });

            if (response.ok) {
                alert('Cliente atualizado com sucesso!');
                window.location.href = 'consultar-cliente.html'; // Voltar para a lista de clientes
            } else {
                throw new Error('Erro ao atualizar cliente');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Não foi possível atualizar o cliente.');
        }
    }

    // Adiciona o evento de submit ao formulário
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        atualizarCliente();
    });

    // Carrega os dados do cliente ao carregar a página
    carregarCliente();
});
