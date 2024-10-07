const express = require("express");
const router = express.Router();
const { createHabit } = require("../controllers/habitController");

router.post("/createHabit", createHabit);
// router.post("/deleteHabit");
// router.post("/updateHabit");
module.exports = router;
