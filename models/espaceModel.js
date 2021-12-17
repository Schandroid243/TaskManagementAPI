const mongoose = require('mongoose');

const { Schema } = mongoose;

const EspaceSchema = new Schema({
    espaceName:{
        type: String,
        required: true,
    },
    tableName:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Espace', EspaceSchema);