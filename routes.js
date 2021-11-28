const express = require('express');
const Router = express.Router();

Router.get('/', (req,res) => {
    res.render('index');
});

Router.get('/login', (req,res) => {
    res.render('login');
});

Router.get('/registro', (req,res) => {
    res.render('register');
});

Router.get('/inventario', (req,res) => {
    res.render('inventory');
});

Router.get('/sobre', (req,res) => {
    res.render('about');
});

Router.get('/dev', (req,res) => {
    res.render('dev');
});


module.exports = Router;