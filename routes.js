const express = require('express');
const Router = express.Router();

Router.get('/', (req,res) => {
    res.render('index');
});

Router.get('/login', (req,res) => {
    res.render('login');
});

Router.get('/inventario', (req,res) => {
    res.render('inventory');
});

Router.get('/sobre', (req,res) => {
    res.render('about');
});

module.exports = Router;