const formulario = document.querySelector("form");

const Inome = document.querySelector(".nome");
const Itel = document.querySelector(".tel"); // Corrigido para 'tel' em vez de 'telefone'
const Iemail = document.querySelector(".email");
const Iendereco = document.querySelector(".endereco");
const Idata = document.querySelector(".dataDeNascimento"); // Corrigido para 'dataDeNascimento'

function cadastrar() {
    fetch("http://localhost:8080/clientes", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            nome: Inome.value,
            telefone: Itel.value,
            email: Iemail.value,
            endereco: Iendereco.value,
            dataNascimento: Idata.value // Ajustado para corresponder ao nome esperado no backend
        })
    })
    .then(response => response.json())
    .then(data => {
        alert('Cliente criado com sucesso!');
        console.log('Cliente cadastrado:', data);
        limpar(); // Limpa o formulário após o sucesso
    })
    .catch(error => {
        console.error('Erro ao cadastrar cliente:', error);
    });
}



function limpar() {
    Inome.value = "";
    Itel.value = "";
    Iemail.value = "";
    Iendereco.value = "";
    Idata.value = "";
}

formulario.addEventListener('submit', function(event) {
    event.preventDefault();
    cadastrar();
});
