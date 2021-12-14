const express = require('express');
const { create, remove, update, getOne, getAll } = require('../controllers/taskController');

const route = express.Router();



route.get('/',getAll);

route.get('/:taskId', getOne);
route.post('/', create);
route.put('/:taskId', update);
route.delete('/:taskId', remove);

module.exports = route;