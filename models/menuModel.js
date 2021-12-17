const mongoose = require('mongoose')

const { Schema } = mongoose;

const MenuSchema = new Schema({
    articleName: {
        type: String,
        required: true
    },
    categorieArticle:{
        type: String,
        required: true
    },
    espaceName:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Menu', MenuSchema);