const userRouter = require('./user');
const homesRouter = require('./homes');
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

module.exports = function (app) {
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use('/user', userRouter);
    app.use('/homes', homesRouter);

};