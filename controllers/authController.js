const User = require('../models/userModel');
const { createToken, maxAge } = require('../utils/createToken');
const bcrypt = require('bcrypt');


const login = async (req, res) => {
    try{
        const user = await User.findOne({email: req.body.email});
        if(user) {
            const auth = await bcrypt.compare(req.body.password, user.password);
            if(auth) {
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

module.exports = { login };