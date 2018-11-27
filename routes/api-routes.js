const ResfulAPI = require('./RestClass');
const db = require('../models');

module.exports = function (app) {

    const todo = new ResfulAPI('todo', app, db.Todo);
    todo.find();
    todo.create();
    todo.delete('id');
    todo.update('_id');
};