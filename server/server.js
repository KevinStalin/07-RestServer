require('./config/config')
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
//procesa peticiones que llegan
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.get('/', (req, res) => {
    //res.send('Hola ');
    res.json('Hola');
});

app.get('/usuario', (req, res) => {
    //res.send('Hola ');
    res.json('get usuario');
});

app.post('/usuario', (req, res) => {
    let body = req.body

    res.json({
        body
    });

    //res.json('post usuario');
});

app.put('/usuario/:id', (req, res) => {
    //res.send('Hola ');
    let id = req.params.id;

    if (body.nombre == undefined) {
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        });
    }
    res.json({
        id
    });
});

app.delete('/usuario', (req, res) => {
    //res.send('Hola ');
    res.json('delete usuario');
});


app.listen(process.env.PORT, () => {
    console.log(`Escuchando en el puerto ${process.env.PORT}`)
});