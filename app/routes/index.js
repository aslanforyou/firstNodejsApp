const userRouter = require('./user');
const express = require("express");
var app = express();
const bodyParser = require("body-parser");

module.exports = function (app) {
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use('/user', userRouter)

};