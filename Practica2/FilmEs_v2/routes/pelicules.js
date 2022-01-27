/*
 * Javier Dacasa Gomez
 * 21/11/2021
 * Enrutador para los servicion de directores
 */

const express = require('express');

let Pelicula = require(__dirname + '/../models/pelicula.js');

let router = express.Router();

let pelicules = [];

router.get('/', (req, res) => {
    Pelicula.find().populate('director').then(resultado => {
        res.status(200)
           .send({ ok: true, resultado: resultado });
    }).catch (error => {
        res.status(500)
           .send({ ok: false, error: "No s'han trobat pel·lícules" });
    }); 
});

router.get('/:id', (req, res) => {
    Pelicula.findById(req.params.id).populate('director').then(resultado => {
        if(resultado)
            res.status(200)
               .send({ ok: true, resultado: resultado });
        else
            res.status(400)
               .send({ ok: false, 
                       error: "Pel·lícula no trobada"});
    }).catch (error => {
        res.status(400)
           .send({ ok: false, 
                   error: "Pel·lícula no trobada"});
    }); 
});

router.get('/valoracio/:valoracio', (req, res) => {
    Pelicula.find({valoracio: {$gte: req.params.valoracio}}).then(resultado => {
        if(resultado && resultado.length > 0)
            res.status(200)
               .send({ ok: true, resultado: resultado });
        else
            res.status(400)
               .send({ ok: false, 
                       error: "No s'han trobat pel·lícules"});
    }).catch (error => {
        res.status(400)
           .send({ ok: false, 
                   error: "No s'han trobat pel·lícules"});
    }); 
});

router.get('/plataforma/:plataforma', (req,res) => {
    let date = new Date;
    Pelicula.find(
        {
        plataforma: 
            {$elemMatch:
                {data: 
                    {$gte: date}
                }
            }
        },
        {plataforma:
            {$elemMatch:
                {nom:
                    {$eq: req.params.plataforma}
                }
            }
        }).populate('plataforma').then(resultado => {
        if(resultado && resultado.length > 0)
            res.status(200).send({ 
                ok: true, 
                data: date,
                resultado: resultado 
            });
        else
            res.status(400)
               .send({ ok: false, 
                       error: "No s'han trobat pel·lícules"});
    }).catch (error => {
        res.status(400)
           .send({ ok: false, 
                   error: "No s'han trobat pel·lícules"});
    }); 
});

router.post('/', (req, res) => {

    let novaPelicula = new Pelicula({
        titol: req.body.titol, 
        duracio: req.body.duracio,
        genere: req.body.genere,
        director: req.body.director,
        valoracio: req.body.valoracio
    });
    novaPelicula.save().then(resultado => {
        res.status(200)
           .send({ok: true, resultado: resultado});
    }).catch(error => {
        res.status(400)
           .send({ok: false, 
                  error: "Error afegint pel·lícula"});
    });
});


router.put('/:id', (req,res) => {
    
    Pelicula.findByIdAndUpdate(req.params.id, {
        $set: {
        titol: req.body.titol, 
        duracio: req.body.duracio,
        genere: req.body.genere,
        director: req.body.director,
        valoracio: req.body.valoracio
        }
    }, {new: true}).then(resultado => {
        if (resultado)
            res.status(200)
               .send({ok: true, resultado: resultado});
        else
            res.status(400)
               .send({ok: false, 
                      error: "Error actualitzant dades de la pel·lícula"});
    }).catch(error => {
        res.status(400)
           .send({ok: false, 
                  error:"Error actualitzant dades de la pel·lícula"});
    });
});

router.put('/plataforma/:id', (req,res) => {

    Pelicula.findByIdAndUpdate(req.params.id, {
        $push: {"plataforma": {
            nom: req.body.nom,
            data: req.body.data,
            quantitat: req.body.quantitat
        }}
    }, {new: true}).then(resultado => {
        if (resultado)
            res.status(200)
               .send({ok: true, resultado: resultado});
        else
            res.status(400)
               .send({ok: false, 
                      error: "Error afegint plataforma"});
    }).catch(error => {
        res.status(400)
           .send({ok: false, 
                  error:"Error afegint plataforma"});
    });
});

router.delete('/:id', (req,res) => {
    Pelicula.findByIdAndRemove(req.params.id).then(resultado => {
        if (resultado)
            res.status(200)
               .send({ok: true, resultado: resultado});
        else
            res.status(400)
               .send({ok: false, 
                      error: "Error esborrant pel·lícula"});
    }).catch(error => {
        res.status(400)
           .send({ok: true, 
                  error:"Error esborrant pel·lícula"});
    });
});

module.exports = router;