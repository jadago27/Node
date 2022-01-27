/*
 * Javier Dacasa Gomez
 * 21/11/2021
 * Archivo principal donde se pone en marcha el servidor
 */

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const peliculas = require(__dirname + '/routes/pelicules');
const directors = require(__dirname + '/routes/directors');

mongoose.connect('mongodb://localhost:27017/filmes', {useNewUrlParser: true});

let app = express();

app.use(bodyParser.json());
app.use('/pelicules', peliculas);
app.use('/directors', directors);

app.listen(8080);
