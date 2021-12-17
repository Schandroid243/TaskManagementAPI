const express = require('express');
const { create, remove, update, getOne, getAll } = require('../controllers/espaceController');


const route = express.Router();

route.get('/',getAll);

route.get('/:espaceId', getOne);
route.post('/', create);
route.put('/:espaceId', update);
route.delete('/:espaceId', remove);

module.exports = route;