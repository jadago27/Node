/*
 * Javier Dacasa Gomez
 * 21/11/2021
 * Enrutador para los servicion de directores
 */

const express = require('express');
const Directors = require('../models/director');

let Director = require(__dirname + '/../models/director.js');
let Pelicula = require(__dirname + '/../models/pelicula.js');

let router = express.Router();

router.get('/', (req,res) => {
   
    Director.find().then(resultado => {
        res.status(200)
           .send({ ok: true, resultado: resultado });
    }).catch (error => {
        res.status(500)
           .send({ ok: false, error: "No s'han trobat directors" });
    }); 
});

router.get('/:id', (req,res) => {
    
    Director.findById(req.params.id).then(resultado => {
        if(resultado)
            res.status(200)
               .send({ ok: true, resultado: resultado });
        else
            res.status(400)
               .send({ ok: false, 
                       error: "Director no trobat"});
    }).catch (error => {
        res.status(400)
           .send({ ok: false, 
                   error: "Director no trobat"});
    }); 
});

router.post('/', (req,res) => {
    let nouDirector = new Director({
        nom: req.body.nom,
        naixement: req.body.naixement
    });
    nouDirector.save().then(resultado => {
        res.status(200)
           .send({ok: true, resultado: resultado});
    }).catch(error => {
        res.status(400).send({
            ok: false, 
            error: "Error afegint director"
        });
    });
})

router.delete('/:id', (req,res) => {

    Pelicula.find({ director: {$eq: req.params.id}}).then(resultado => {
        if (resultado && resultado.legnth > 0)
        {
            res.status(400).send({
                ok: false, 
                error: "No es eliminar el director perquè té pel·lícules associades"
            });
        }  
        else
        {
            Director.findByIdAndRemove(req.params.id).then(resultado => {
                if (resultado)
                    res.status(200)
                    .send({ok: true, resultado: resultado});
                else
                    res.status(400).send({
                        ok: false, 
                        error: "Error eliminant director"
                    });
            }).catch(error => {
                res.status(400)
                .send({ok: true, 
                        error:"Error eliminant director"});
            });
        }
            
    }).catch(error => {
        res.status(400)
        .send({ok: true, 
                error:"Error director"});
    }); 
});

module.exports = router;