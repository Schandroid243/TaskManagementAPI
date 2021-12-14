const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const pkg = require('validator');

const {Schema} = mongoose;

const UserSchema = new Schema({
    username: {
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
    }
});

UserSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

module.exports = mongoose.model('User', UserSchema);