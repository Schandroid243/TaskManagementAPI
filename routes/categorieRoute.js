const express = require('express');
const { create, remove, update, getOne, getAll } = require('../controllers/categorieController');


const route = express.Router();

route.get('/',getAll);

route.get('/:categoryId', getOne);
route.post('/', create);
route.put('/:categoryId', update);
route.delete('/:categoryId', remove);

module.exports = route;