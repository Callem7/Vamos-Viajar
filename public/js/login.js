let signInForm = document.querySelector('.sign-in-form'); //  seleccionar o sinal no elemento do formulário
let registerForm = document.querySelector('.register-form'); // seleccionar o elemento do formulário de registo

// adicionar um "submit event listener" ao sign in form
signInForm.addEventListener('submit', function(e) {
    e.preventDefault(); // impedir o comportamento padrão de submissão de formulários
    // obter os valores do e-mail e da palavra-chave a partir do formulário
    let email = document.querySelector('#sign-in-email').value;
    let password = document.querySelector('#sign-in-password').value;
    // enviar um pedido POST para a rota /login com o e-mail e a palavra-passe como corpo do pedido
    fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    }).then((resp) => resp.json()).then((data) => { // analisar a resposta como JSON e atribuí-la à variável de dados
        let redirectURL = data.redirectURL;
        if(redirectURL) { // se for fornecido um URL de redireccionamento
            // navegar para o URL
            window.location.href = redirectURL;
        } else {
            // exibir uma mensagem de erro
            alert('A sua palavra-passe e e-mail não coincidem. Por favor, tente novamente.')
        }
    });
});

// adicionar um ouvinte de eventos ao register form
registerForm.addEventListener('submit', function(e) {
    e.preventDefault(); // impedir o comportamento padrão de submissão de formulários
    // obter o e-mail, a palavra-passe e os valores da palavra-passe reintroduzidos no formulário
    let email = document.querySelector('#register-email').value;
    let password = document.querySelector('#register-password').value;
    let rePassword = document.querySelector('#register-re-enter-password').value;
    
    if(password !== rePassword) { // se as palavras-passe não corresponderem
        return; // não submeter o formulário
    }
    // enviar um pedido POST para a rota /registo com o e-mail e a palavra-chave como organismo de pedido
    fetch('http://localhost:3000/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    }).then((resp) => resp.text()).then((data) => alert(data)); // analisar a resposta como texto e exibi-la num alerta
});
