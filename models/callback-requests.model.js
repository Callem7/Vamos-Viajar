let mongoose = require('mongoose'); // importa mongoose
let Schema = mongoose.Schema; //criar um novo esquema

let callbackRequestsSchema = new Schema({
    id: String, // campo de id com tipo String
    phoneNumber: String, // campo de phoneNumber com o tipo String
    date: Date // campo de date com o tipo Date
});

// criar um modelo para o esquema CallbackRequest
let CallbackRequest = mongoose.model('CallbackRequest', callbackRequestsSchema, 'callback-requests');

// exportar o modelo CallbackRequest
module.exports = { CallbackRequest };