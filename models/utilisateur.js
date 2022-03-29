const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Utilisateur = new Schema({
    identite: String,
    code: String,
    poste: String,
});
module.exports = mongoose.model('Utilisateurs', Utilisateur);
