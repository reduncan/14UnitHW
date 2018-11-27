const db = require("../models");

class RestfulAPI {
    constructor(resource, app, model) {
        this.resource = resource;
        this.app = app;
        this.model = model;
    }

    find() {
        this.app.get(`/api/${this.resource}`, (req, res) => {
            this.model.findAll({})
                .then(function (dbTodo) {
                    res.json(dbTodo);
                }).catch(function (err) {
                    res.json(err);
                });
        });
    };

    create() {
        this.app.post(`/api/${this.resource}`, (req, res) => {
            this.model.create({
                todo: req.body.todo,
                complete: req.body.complete
            }).then(function (dbTodo) {
                res.json(dbTodo);
            }).catch(function (err) {
                res.json(err);
            });
        });
    };

    delete(identifier) {
        this.app.delete(`/api/${this.resource}/:${identifier}`, (req, res) => {
            this.model.destroy({
                where: {
                    id: req.params[identifier]
                }
            }).then(function(dbTodo) {
                res.json(dbTodo);
            }).catch(function(err) {
                res.json(err);
            });
        });
    };

    update(identifier) {
        this.app.put(`/api/${this.resource}/:${identifier}`, (req, res) => {
            this.model.update({
                complete: req.body.complete
            }, {
                where: {
                    id: req.params[identifier]
                }
            }).then(function(dbTodo) {
                res.json(dbTodo);
            }).catch(function(err) {
                res.json(err);
            });
        });
    };
};

module.exports = RestfulAPI;