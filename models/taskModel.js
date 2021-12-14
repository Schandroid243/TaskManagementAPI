const mongoose = require('mongoose');

const { Schema } = mongoose;

const TaskSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    time:{
        type: Number,
        required: true
    },
    date:{
        type: Date,
        default:Date.now()
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        ref:'User'
    } ,
});

module.exports = mongoose.model('Task', TaskSchema);