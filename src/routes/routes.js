const express = require("express");
const route = express.Router();
const librosRoute = require("../modules/libros/librosRoute");
const authentication = require("../middlewares/auth");

route.use("/libros", authentication, librosRoute);

module.exports = route;