const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
const _ = require('underscore')
const jwt = require('jsonwebtoken');

const app = express();

app.post('/login', (req, res) => {
    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
        //si existe un error en la BDD u otra en el servidor
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: '(Usuario) o contraseña incorrectos'
                }
            });
        }
        //Comprar contraseñas encriptadas
        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o (contraseña) incorrectos'
                }
            });
        }
        //generar token

        let token = jwt.sign({
                usuario: usuarioDB
            },
            //'seed-dessarrollo', { expiresIn: 60 * 60 * 24 * 30 });
            process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN }); //1h

        res.json({
            ok: true,
            usua: usuarioDB,
            token

        });
    });
});





module.exports = app;