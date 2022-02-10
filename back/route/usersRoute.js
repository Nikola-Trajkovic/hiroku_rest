const express = require('express');
const { sequelize, Users, Messages } = require('../models');
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

route.get('/users',authToken, (req, res) => {
    Users.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.post('/users',authToken, (req, res) => {

    var validirano = true;
    var error;

    const sema = Joi.object().keys({

        username: Joi.string().min(3).max(20).required(),
        firstName: Joi.string().min(3).max(15).required(),
        lastName: Joi.string().min(3).max(15).required(),
        email: Joi.string().trim().email().required(),
        password: Joi.string().min(3).max(15).required(),
        type: Joi.optional()

    })
    
    const obj = {
        username: req.body.username,
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        email: req.body.email,
        password:req.body.password,
        type: req.body.type
    };

    Joi.validate(obj, sema, (err, result) => {

        if(err){
            error = err.message;
            console.log("ERROR " + err.message);
            //res.send(err.details[0].message);
            validirano = false;
        }

    });


    obj.password = bcrypt.hashSync(req.body.password, 10);

    if(validirano){

        Users.create(obj).then( rows => {
        
            const usr = {
                userId: rows.id,
                user: rows.username
            };
    
            const token = jwt.sign(usr, process.env.ACCESS_TOKEN_SECRET);
    
            console.log("token " + token);
            
            res.json({ token: token });
    
        }).catch( err => res.status(500).json(err) );

    }
    else{
        res.json({error: error});
    }

    
        
});

route.delete('/users',authToken, (req,res) => {

    Users.findOne({ where: { id: req.body.id } })
        .then( usr => {
            usr.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );

});

route.put('/users', authToken,(req, res) => {

    Users.findOne({ where: { id: req.body.id }})
        .then( usr => {

            var validirano = true;
            var error;

            const obj = {
                username: req.body.username,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                type: req.body.type
            }

            const sema = Joi.object().keys({

                username: Joi.string().min(3).max(20).required(),
                firstName: Joi.string().min(3).max(15).required(),
                lastName: Joi.string().min(3).max(15).required(),
                email: Joi.string().trim().email().required(),
                type: Joi.optional()
        
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
                
                usr.username = obj.username;
                usr.firstName = obj.firstName;
                usr.lastName = obj.lastName;
                usr.email = obj.email;
                usr.type = obj.type


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