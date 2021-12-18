const User = require('../models/userModel');
const { createToken, maxAge } = require('../utils/createToken');
const bcrypt = require('bcrypt');
const jwt  = require('jsonwebtoken');


const login = async (req, res) => {
    try{
        const user = await User.findOne({email: req.body.email});
        if(user) {
            const auth = await bcrypt.compare(req.body.password, user.password);
            console.log(user);
            if(req.body.password === user.password) {
                return res.status(200).json({
                    token: createToken(user._id),
                    Expires: maxAge,
                    user
                })
            }
        }
        return res.status(401).json({
            message: 'Invalid username or password',
            success: false
        })
    } catch(err) {
        return res.status(500).json({
            message: err.message,
            success: false
        })
    }
}

const me = async (req, res) => {
    console.log(res.locals.user);
    return res.json({
        user: res.locals.user.toJSON()
    })       
}

module.exports = { login, me };