const express = require('express');
const { create, remove, update, getOne, getAll } = require('../controllers/accessLevelController');


const route = express.Router();

route.get('/',getAll);

route.get('/:accessId', getOne);
route.post('/', create);
route.put('/:accessId', update);
route.delete('/:accessId', remove);

module.exports = route; 