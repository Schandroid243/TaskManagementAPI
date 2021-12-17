const express = require('express');
const { create, remove, update, getOne, getAll } = require('../controllers/menuController');


const route = express.Router();

route.get('/',getAll);

route.get('/:menuId', getOne);
route.post('/', create);
route.put('/:menuId', update);
route.delete('/:menuId', remove);

module.exports = route; 