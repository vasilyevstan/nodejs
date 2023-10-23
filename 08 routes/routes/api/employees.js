const express = require('express');
const router = express.Router();
//const path = require('path')
const data = {};
data.employees = require('../../data/employees.json');

router.route('/')
    .get((req, res) => {
        res.json(data.employees);
    })
    .post((req, res) => {
        // refer pкma req.body 
        res.json({
            "name" : req.body.name,
            "surname": req.body.surname
        });
    })
    .put((req, res) => {
        res.json({
            "name" : req.body.name,
            "surname": req.body.surname
        });
    })
    .delete((req, res) => {
        res.json({ "id": req.body.id });
    });

    router.route('/:id')
        .get((req, res) => {
            res.json({ "id": req.params.id});
        });

module.exports = router;