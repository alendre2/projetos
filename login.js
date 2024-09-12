document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById('loginForm');

    if (!loginForm) {
        console.error('Formulário de login não encontrado.');
        return;
    }

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o envio padrão do formulário

        const login = loginForm.elements['login'].value;
        const senha = loginForm.elements['senha'].value;

        fetch('http://localhost:8080/administrador/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ login, senha })
        })
        .then(response => {
            if (response.ok) {
                window.location.href = 'admin.html'; // Redireciona para a página de administração
            } else {
                return response.text().then(text => { 
                    alert(text); // Exibe a mensagem de erro
                });
            }
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    });
});
