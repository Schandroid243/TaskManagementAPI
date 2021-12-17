const express = require('express');
const User = require('../models/userModel');
const { handleError } = require('../utils/ErrorHandler');

const route = express.Router();

route.post('/', async (req, res, next) => {
    try{
        const user = await User.create({
            ...req.body
        });
        return res.status(201).json({user: user._id});
    } catch(err){
        const error = handleError(err);
        return res.status(500).json({error});
    }
})

module.exports = route;