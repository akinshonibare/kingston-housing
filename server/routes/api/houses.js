const express = require("express");
var router = express.Router();
const housesController = require("../../controllers/houses.controller");

router.get("/", housesController.getAllHouses);
router.post("/", housesController.getHouse);
router.get("/filters", housesController.getFilters);

module.exports = router;
