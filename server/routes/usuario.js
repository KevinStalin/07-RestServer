const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');

const app = express();

app.get('/usuario', (req, res) => {
    //res.send('Hola ');
    res.json('get usuario');
});

app.post('/usuario', (req, res) => {
    let body = req.body
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });
    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        //usuarioDB.password = null;
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
    //res.json('post usuario');
});

app.put('/usuario/:id', (req, res) => {
    //res.send('Hola ');
    let id = req.params.id;

    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        });
    } else {
        res.json({
            id
        });

    }
});

app.delete('/usuario', (req, res) => {
    //res.send('Hola ');
    res.json('delete usuario');
});

module.exports = app;