const express = require('express');
const { create, remove, update, getOne, getAll } = require('../controllers/userController');


const route = express.Router();

route.get('/',getAll);

route.get('/:userId', getOne);
route.post('/', create);
route.put('/:userId', update);
route.delete('/:userId', remove);

module.exports = route; 