/*
 * Javier Dacasa Gomez
 * 21/11/2021
 * Schema para guardar informacion de directores y exporta la collecion como Director
 */

const mongoose = require('mongoose');

let directorSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
        minlength: 5,
        trim: true
    },
    naixement: Number
});

let Director = mongoose.model('director', directorSchema);

module.exports = Director;