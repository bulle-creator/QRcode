const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Interventions = new Schema({
    code: String,
    salle: String,
    heured: String,
    heuref: String,
});
module.exports = mongoose.model('Interventions', Interventions);
