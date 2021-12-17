const mongoose = require('mongoose')

const { Schema } = mongoose;

const ArticleSchema = new Schema({
    code: {
        type: String,
        required: true,
    },
    label: { 
        type: String,
        required: true,
    },
     breakAlert: {
         type: String,
         required: true,
     },
     category: { 
         type: String,
         required: true,
     },
     date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Article', ArticleSchema);