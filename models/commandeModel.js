const mongoose = require('mongoose');

const  { Schema } = mongoose;

const CommandeSchema = new Schema({
    numCommands: {
        type: String,
        required: true
    },
    espaceName: {
        type: String,
        required: true
    },
    montant:{
        type: String,
        required: true 
    },
    statutCommande:{
        type: String,
        required: true
    },
    numFacturations:{
        type: Number,
        required: true
    },
    numClients:{
        type: Number,
        required: true
    },
    serverName:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Commande', CommandeSchema);