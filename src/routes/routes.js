const express = require("express");
const route = express.Router();
const librosRoute = require("../modules/libros/librosRoute");

route.use("/libros", librosRoute);

module.exports = route;