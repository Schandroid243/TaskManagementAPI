const express = require('express');
const { create, remove, update, getOne, getAll } = require('../controllers/genreController');


const route = express.Router();

route.get('/',getAll);

route.get('/:genreId', getOne);
route.post('/', create);
route.put('/:genreId', update);
route.delete('/:genreId', remove);

module.exports = route; 