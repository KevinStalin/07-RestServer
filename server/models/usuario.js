const mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');


let Schema = mongoose.Schema;

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
}

//configuramos la coleccion usuario
let usurarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    email: {
        type: String,
        required: [true, 'El correo es requerido'],
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: false
    }, //String no abligado
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    }, //String
    estado: {
        type: Boolean,
        default: true
    }, //boolean
    google: {
        type: Boolean,
        default: false
    } //boolean
});

usurarioSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' })

usurarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject
}

module.exports = mongoose.model('usuario', usurarioSchema);