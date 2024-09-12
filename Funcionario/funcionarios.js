const formulario = document.querySelector("form");

const Inome = document.querySelector(".nome");
const Itel = document.querySelector(".tel"); // Corrigido para 'tel'
const Iemail = document.querySelector(".email");
const Isalario = document.querySelector(".salario");
const IdataAdmisao = document.querySelector(".dataAdmisao"); // Corrigido para 'dataAdmisao'
const Icargo = document.querySelector(".cargo");
const Idepartamento = document.querySelector(".departamento");
const Iendereco = document.querySelector(".endereco");

function cadastrar() {
    fetch("http://localhost:8080/funcionario", { // Atualizado para o endpoint correto
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            nome: Inome.value,
            telefone: Itel.value,
            email: Iemail.value,
            salario: parseFloat(Isalario.value), // Convertido para número
            dataAdmissao: IdataAdmisao.value, // Ajustado para corresponder ao nome esperado no backend
            cargo: Icargo.value,
            departamento: Idepartamento.value,
            endereco: Iendereco.value
        })
    })
    .then(response => response.json())
    .then(data => {
        alert('Funcionário criado com sucesso!');
        console.log('Funcionário cadastrado:', data);
        limpar(); // Limpa o formulário após o sucesso
    })
    .catch(error => {
        console.error('Erro ao cadastrar funcionário:', error);
    });
}

function limpar() {
    Inome.value = "";
    Itel.value = "";
    Iemail.value = "";
    Isalario.value = "";
    IdataAdmisao.value = "";
    Icargo.value = "";
    Idepartamento.value = "";
    Iendereco.value = "";
}

formulario.addEventListener('submit', function(event) {
    event.preventDefault();
    cadastrar();
});
