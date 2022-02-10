const express = require('express');
const { sequelize, Users } = require('./models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const Joi = require('joi');
require('dotenv').config();

const app = express();

var corsOptions = {
    origin: 'http://localhost:8000',
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions));



app.post('/register', (req, res) => {

    var validirano = true;
    var error;

    if(req.body.type == 1){
        req.body.type = "moderator"
    }else{
        req.body.type = "user"
    }

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
        password: req.body.password,
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
            
            res.json({ token: token, role: obj.userId });
    
        }).catch( err => res.status(500).json(err) );

    }else{
        res.json({error: error});
    }
    
});

app.post('/login', (req, res) => {

    Users.findOne({ where: { username: req.body.username } })
        .then( usr => {

            if(usr == null){
                res.status(400).json({ msg: "Invalid credentials"});
                return;
            }


            if (bcrypt.compareSync(req.body.password, usr.password)) {
              
                const obj = {
                    userId: usr.id,
                    username: usr.username,
                    type: usr.type
                };

                
        
                const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);

                
                res.json({ token: token, role: obj.userId });
            } else {
                res.status(400).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => res.status(500).json(err) );
});

app.listen({ port: 9000 }, async () => {
    await sequelize.authenticate();
    console.log("started app_auth");
});