const express = require('express');
const { sequelize, Motors} = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require('joi');
require('dotenv').config();

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.status(401).json({ msg: err });
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) return res.status(403).json({ msg: err });
    
        req.user = user;
    
        next();
    });
}

//route.use(authToken);

route.get('/motor', authToken, (req, res) => {
    Motors.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.post('/motor', (req, res) => {

    console.log("Usao u rest");

    var validirano = true;
    var error;
    
    const obj = {
        marka: req.body.marka,
        model: req.body.model,
        godiste: req.body.godiste,
        kubikaza: req.body.kubikaza,
        kilometraza: req.body.kilometraza,
        tip: req.body.tip,
        gorivo: req.body.gorivo
    };

    const sema = Joi.object().keys({

        marka: Joi.string().min(2).max(20).required(),
        model: Joi.string().min(2).max(15).required(),
        godiste: Joi.number().required(),
        kubikaza: Joi.number().required(),
        kilometraza: Joi.number().required(),
        tip: Joi.string().max(20).required(),
        gorivo: Joi.string().min(3).max(20).required()

    })

    Joi.validate(obj, sema, (err, result) => {

        if(err){
            error = err.message;
            console.log("ERROR " + err.message);
            //res.send(err.details[0].message);
            validirano = false;
        }

    });

    if(validirano){

        Motors.create(obj)
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

    }else{
        res.json({error: error});
    }

   
        
});

route.delete('/motor',authToken, (req,res) => {

    Motors.findOne({ where: { id: req.body.id } })
        .then( usr => {
            usr.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );

});

route.put('/motor',authToken, (req, res) => {

    Motors.findOne({ where: { id: req.body.id }})
        .then( usr => {

            var validirano = true;
            var error;

            const obj = {

                marka : req.body.marka,
                model : req.body.model,
                godiste : req.body.godiste,
                kubikaza : req.body.kubikaza,
                kilometraza : req.body.kilometraza,
                tip : req.body.tip,
                gorivo : req.body.gorivo
            
            }

            const sema = Joi.object().keys({

                marka: Joi.string().min(2).max(20).required(),
                model: Joi.string().min(2).max(15).required(),
                godiste: Joi.number().required(),
                kubikaza: Joi.number().required(),
                kilometraza: Joi.number().required(),
                tip: Joi.string().max(20).required(),
                gorivo: Joi.string().min(3).max(20).required()
        
            })
        
            Joi.validate(obj, sema, (err, result) => {
        
                if(err){
                    error = err.message;
                    console.log("ERROR " + err.message);
                    //res.send(err.details[0].message);
                    validirano = false;
                }
        
            });

            if(validirano){

                usr.marka = obj.marka;
                usr.model = obj.model;
                usr.godiste = obj.godiste;
                usr.kubikaza = obj.kubikaza;
                usr.kilometraza = obj.kilometraza;
                usr.tip = obj.tip;
                usr.gorivo = obj.gorivo;



                usr.save()
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );

            }else{
                res.json({error: error});
            }


            
        })
        .catch( err => res.status(500).json(err) );

});


module.exports = route;