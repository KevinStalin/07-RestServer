const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
const _ = require('underscore')

const { verificaToken } = require('../middlewares/autenticacion')
const app = express();

app.get('/usuario', (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 0;
    limite = Number(limite);
    //              Filtrar
    Usuario.find({ estado: true }, 'nombre email role estado')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    numero: conteo
                });
            });
        });
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
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);
    //especifico los campos que voy a actualizar

    //lo que yo no quiero que se actualize elimino 
    //delete body.password;
    //delete body.google;

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

app.delete('/usuario/:id', (req, res) => {
    //res.send('Hola ');
    let id = req.params.id;
    let cambiarEstado = {
            estado: false
        }
        //Usuario.findByIdAndDelete(id, (err, usuarioEliminado) => {
    Usuario.findByIdAndUpdate(id, cambiarEstado, { new: true, runValidators: true, context: 'query' }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!usuarioDB) {
            res.json({
                ok: false,
                err: {
                    message: "Usuario no encontradado",
                },
            });
        } else {
            res.json({
                ok: true,
                usuario: usuarioDB
            });
        }

    });
});

module.exports = app;