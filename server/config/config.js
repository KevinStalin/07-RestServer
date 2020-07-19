//=====================
//puerto
//=====================

process.env.PORT = process.env.PORT || 3000;

//=====================
//entorno
//=====================

process.env.NODE_ENV === process.env.NODE_ENV || 'dev';

//=====================
//Vencimiento del Token
//=====================
//60 segundos
//60 minutos
//24 horas
//30 dias

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//=====================
//SEDD de Autenticacion
//=====================

process.env.SEED === process.env.SEED || 'seed-dessarrollo';

//=====================
//Base de datos
//=====================

//para heroku
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://User_DataBase:kevin@pruebamongodb-6oz0y.mongodb.net/cafe'
}