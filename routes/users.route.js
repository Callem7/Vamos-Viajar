let User = require('../models/user.model').User; // importa o modelo do Utilizador
let express = require('express'); // importa express
let router = express.Router(); // cria um novo router
let bcrypt = require('bcrypt'); // importa a biblioteca bcrypt para o hashing da senha
let auth = require('../controllers/auth'); // importa o módulo auth

// rota para tratar do login do utilizador
router.post('/login', async (req, resp) => {
    // obter o e-mail e a palavra-chave de request body
    let email = req.body.email;
    let password = req.body.password;

    // encontrar o utilizador com o e-mail correspondente
    let users = await User.find().where({email: email});
    if(users.length > 0) { // se o utilizador foi encontrado
        let comparisonResult = await bcrypt.compare(password, users[0].password); // compara a palavra-passe fornecida com a palavra-passe hashed armazenada na base de dados
        if(comparisonResult) { // se a palavra-passe estiver correcta
            let token = auth.generateToken(users[0]); // gera uma ficha JWT para o utilizador
            resp.cookie('auth_token', token); // define a ficha como um cookie
            resp.send({ // envia uma resposta com uma mensagem de sucesso e um URL redireccionado
                redirectURL: '/admin',
                message: 'Successo'
            });
        } else { // se a palavra-passe estiver incorrecta
            // envia uma resposta com uma mensagem de rejeição
            resp.send({message: 'Rejeitado'});
        }
    } else { // se o utilizador não foi encontrado
        // envia uma resposta com uma mensagem de rejeição
        resp.send({message: 'Rejeitado'});
    }
})

// rota para tratamento do registo de utilizadores
router.post('/register', async (req, resp) => {
    // obter o e-mail e a palavra-chave de request body
    let email = req.body.email;
    let password = req.body.password;

    // encontrar o utilizador com o e-mail correspondente
    let users = await User.find().where({email: email});
    if(users.length === 0) { // se o utilizador não existir
        //  hash a palavra-passe fornecida
        let encryptedPass = await bcrypt.hash(password, 12);
        // criar um novo objecto de utilizador com o e-mail fornecido e palavra-passe de hash
        let newUser = new User({ 
            email, 
            password: encryptedPass
        });
        // guarda o novo utilizador na base de dados
        await newUser.save();
        // envia uma resposta com uma mensagem de sucesso
        resp.send({message: 'Feito'});
    } else { // se o utilizador já existir
        // envia uma resposta com uma mensagem de rejeição
        resp.send({message: 'Rejeitado'});
    }
})

// exportar o router
module.exports = router;
