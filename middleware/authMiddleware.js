const User = require('../models/userModel');
const jwt  = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    const token = req.headers.authorization;

    if(token) {
        jwt.verify(token, 'schandroid', (err, decodedToken) => {
            if(err) {
                return res.status(401).json({
                    message: err.message
                })
            }else {
                let user = User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }

        })
    } else {
        return res.status(401).json({
            message: 'Error'
        })
    }
}

module.exports = { requireAuth };