const express = require('express');
const { sequelize, Users } = require('./models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const auto = require('./route/autoRoute');
const motor = require('./route/motorRoute');
const oglas_auto = require('./route/olgas_autoRoute');
const oglas_motor = require('./route/oglas_motorRoute');
const users = require('./route/usersRoute');

const cors = require('cors');
require('dotenv').config();

const app = express();

var corsOptions = {
    origin: 'http://localhost:8000',
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions));

app.use("/api",auto);
app.use("/api",motor);
app.use("/api",oglas_auto);
app.use("/api",oglas_motor);
app.use("/api",users);


app.listen({ port: process.env.PORT || 10000 }, async () => {
    await sequelize.authenticate();
    console.log("started app_rest");
});