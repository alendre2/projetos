document.addEventListener('DOMContentLoaded', () => {
    const tabelaClientes = document.querySelector('#tabelaClientes tbody');

    // Função para buscar clientes da API e preencher a tabela
    const buscarClientes = async () => {
        try {
            const response = await fetch('http://localhost:8080/clientes');
            if (!response.ok) throw new Error('Erro ao buscar clientes');

            const clientes = await response.json();
            preencherTabela(clientes);
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    // Função para preencher a tabela com os dados dos clientes
    const preencherTabela = (clientes) => {
        tabelaClientes.innerHTML = ''; // Limpa a tabela antes de preencher

        tabelaClientes.innerHTML = clientes.map(cliente => `
            <tr>
                <td>${cliente.id}</td>
                <td>${cliente.nome || 'Não informado'}</td>
                <td>${cliente.telefone || 'Não informado'}</td> <!-- Ajustado para telefone -->
                <td>${cliente.email || 'Não informado'}</td>
                <td>${cliente.endereco || 'Não informado'}</td>
                <td>${cliente.dataNascimento ? new Date(cliente.dataNascimento).toLocaleDateString('pt-BR') : 'Não informado'}</td> <!-- Ajustado para dataNascimento -->
                <td>
                    <button class="editar" data-id="${cliente.id}">Editar</button>
                    <button class="excluir" data-id="${cliente.id}">Excluir</button>
                </td>
            </tr>
        `).join('');

        adicionarEventosBotoes();
    };

    // Função para adicionar eventos aos botões de Editar e Excluir
    const adicionarEventosBotoes = () => {
        document.querySelectorAll('.editar').forEach(botao => {
            botao.addEventListener('click', (e) => {
                const id = e.target.dataset.id;
                window.location.href = `editar-cliente.html?id=${id}`;
            });
        });

        document.querySelectorAll('.excluir').forEach(botao => {
            botao.addEventListener('click', async (e) => {
                const id = e.target.dataset.id;
                if (confirm('Você realmente deseja excluir este cliente?')) {
                    try {
                        const response = await fetch(`http://localhost:8080/clientes/${id}`, { method: 'DELETE' });
                        if (response.ok) {
                            alert('Cliente excluído com sucesso!');
                            buscarClientes();
                        } else {
                            throw new Error('Erro ao excluir cliente');
                        }
                    } catch (error) {
                        console.error('Erro:', error);
                        alert('Não foi possível excluir o cliente.');
                    }
                }
            });
        });
    };

    buscarClientes();
});
