const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const pkg = require('validator');

const {Schema} = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    adress:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
    genre:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        unique: true,
        lowercase: true,
        required:[true, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now()
    }
});

UserSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

module.exports = mongoose.model('User', UserSchema);