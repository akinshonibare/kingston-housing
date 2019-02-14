"use strict";

// This module is the proxy server used to make all external api calls
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");

var housesRouter = require("./routes/api/houses");

var config = require("./config/config");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: "SECRET", saveUninitialized: true, resave: true }));

// APIS ********************************************

// CLOUD DB CONNECTION
mongoose
	.connect(config.config.MONGO_URI, { useNewUrlParser: true })
	.then(() => console.log("connection succesful"))
	.catch(err => console.error(err));

let db = mongoose.connection;
db.on("error", console.error.bind(console, "#MongoDB - connection error"));

app.use("/houses", housesRouter);

// END APIS ***************************************************
module.exports = app;
