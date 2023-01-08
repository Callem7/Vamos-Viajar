let mongoose = require('mongoose'); // importa mongoose
let Schema = mongoose.Schema; // create a new schema

let postSchema = new Schema({
    id: String, // campo de id com tipo String
    title: String, // campo de title com tipo String
    date: Date, // campo de date com tipo Data
    description: String, // campo de description com tipo String
    text: String, // campo de text com tipo String
    country: String, // campo de country com o tipo String
    imageURL: String // campo de imageURL com o tipo String
});

// criar um modelo para o esquema Post
let Post = mongoose.model('Post', postSchema);

// exportar o modelo Post
module.exports = { Post }
