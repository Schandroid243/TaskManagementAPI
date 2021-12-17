const express = require('express');
const { create, remove, update, getOne, getAll } = require('../controllers/articleController');


const route = express.Router();

route.get('/',getAll);

route.get('/:articleId', getOne);
route.post('/', create);
route.put('/:articleId', update);
route.delete('/:articleId', remove);

module.exports = route; 