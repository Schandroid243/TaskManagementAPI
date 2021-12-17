const express = require('express');
const { create, remove, update, getOne, getAll } = require('../controllers/statutCommandeController');


const route = express.Router();

route.get('/',getAll);

route.get('/:statusId', getOne);
route.post('/', create);
route.put('/:statusId', update);
route.delete('/:statusId', remove);

module.exports = route; 