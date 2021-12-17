const express = require('express');
const { create, remove, update, getOne, getAll } = require('../controllers/commandeController');


const route = express.Router();

route.get('/',getAll);

route.get('/:commandeId', getOne);
route.post('/', create);
route.put('/:commandeId', update);
route.delete('/:commandeId', remove);

module.exports = route; 