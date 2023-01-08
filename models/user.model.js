let mongoose = require('mongoose'); // importa mongoose
let Schema = mongoose.Schema; // criar um novo esquema

let userSchema = new Schema({
    email: String, // campo de e-mail com tipo String
    password: String // password de e-mail com tipo String
});

// criar um modelo para o esquema do utilizador
let User = mongoose.model('User', userSchema, 'users');

// exportar o modelo de Utilizador
module.exports = { User }
