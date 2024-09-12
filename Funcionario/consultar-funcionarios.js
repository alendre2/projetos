document.addEventListener('DOMContentLoaded',() => {
    const tabelaFuncionarios = document.querySelector("#tabelaFuncionarios tbody");

    const buscarFuncionarios = async () => {
        try{
            const response = await fetch('http://localhost:8080/funcionario');
            if (!response.ok) throw new Error ('Erro ao buscar Funcionarios');

            const funcionario = await response.json();
            preencherTabela(funcionario);
        }catch(error){
            console.error('Erro: ', error);
        }

    };

    const preencherTabela = (funcionario) => {
        tabelaFuncionarios.innerHTML = '';

        tabelaFuncionarios.innerHTML = funcionario.map(funcionario => `
                <tr>
                    <td>${funcionario.id}</td>
                    <td>${funcionario.nome || 'Não informado'}</td>
                    <td>${funcionario.email || 'Não informado'}</td>
                    <td>${funcionario.telefone || 'Não informado'}</td>
                    <td>${funcionario.salario || 'Não informado'}</td>
                    <td>${funcionario.dataAdmisao ? 
                    new Date(funcionario.dataAdmisao).toLocaleDateString('pt-BR') : 
                    'Não informado'}</td>
                    <td>${funcionario.cargo || 'Não informado'}</td>
                    <td>${funcionario.departamento || 'Não informado'}</td>
                    <td>${funcionario.endereco || 'Não informado'}</td>
                    <td>
                        <button class="editar" data-id"${funcionario.id}">Editar</button> 
                        <button class="excluir" data-id"${funcionario.id}">Excluir</button>
                    </td>            
                </tr>      
            `).join('');
            adicionarEventosBotoes();
    };

    const adicionarEventosBotoes = () =>{
        document.querySelectorAll('.editar').forEach(botao => {
            botao.addEventListener('click', (e) => {
                const id = e.target.dtaset.id;
                window.location.href = `editar-funcionario.html?id=${id}`;
            });
    });

    document.querySelectorAll('.excluir').forEach(botao => {
        botao.addEventListener('click', async (e) => {
            const id = e.target.dataset.id;
            if (confirm('Você realmente deseja excluir este funcionario?')) {
                try {
                    const response = await fetch(`http://localhost:8080/funcionario/${id}`, { method: 'DELETE' });
                    if (response.ok) {
                        alert('Funcionario excluído com sucesso!');
                        buscarClientes();
                    } else {
                        throw new Error('Erro ao excluir funcionario');
                    }
                } catch (error) {
                    console.error('Erro:', error);
                    alert('Não foi possível excluir o funcionario.');
                }
            }
        });
    });
};

buscarFuncionarios();
});