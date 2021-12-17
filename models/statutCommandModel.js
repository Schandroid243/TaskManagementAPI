const mongoose = require('mongoose')

const { Schema } = mongoose;

const StatutCommandeSchema = new Schema({
    name:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('StatutCommande', StatutCommandeSchema);