let mongoose = require('mongoose'); // importa mongoose
let Schema = mongoose.Schema; //criar um novo esquema

let emailSchema = new Schema({
    id: String, //campo de id com tipo String
    email: String,  //campo de email com tipo String
    name: String,  //campo de name com tipo String
    text: String,  //campo de texto com tipo String
    date: Date //campo de date com tipo Data
});

// criar um modelo para o esquema Email
let Email = mongoose.model('Email', emailSchema, 'emails');

//exportar o modelo Email
module.exports = { Email };