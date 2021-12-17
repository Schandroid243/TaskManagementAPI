const mongoose = require('mongoose');

const { Schema } = mongoose;

const AccessLevelSchema = new Schema({
    accessName: {
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('AccessLevel', AccessLevelSchema);