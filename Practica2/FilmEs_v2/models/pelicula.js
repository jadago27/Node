/*
 * Javier Dacasa Gomez
 * 21/11/2021
 * Schema para guardar informacion de peliculas, con un subdocumento para guardar la informacion
 * de la plataforma y exporta la collecion como Director
 */

const mongoose = require('mongoose');

let plataformaSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
        minlength: 2,
        trim: true
    },
    data: Date,
    quantitat: {
        type: String,
        default: 'no',
        trim: true
    }
});

let peliculaSchema = new mongoose.Schema({
    titol: {
        type: String,
        required: true,
        minlength: 2,
        trim: true
    },
    duracio: {
        type: Number,
        required: true,
        min: 0
    },
    genere: {
        type: String,
        required: true,
        enum: ['comedia', 'terror', 'drama', 'aventures', 'altres']    
    },
    valoracio: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    director: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'director'
    },
    plataforma: [plataformaSchema]
});

let Pelicula = mongoose.model('pelicula', peliculaSchema);

module.exports = Pelicula;