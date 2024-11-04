const express = require("express");
const router = express.Router();
const { createHabit, getHabits } = require("../controllers/habitController");

router.post("/createHabit", createHabit);
router.get("/getHabits/:email", getHabits);
// router.post("/updateHabit");
module.exports = router;
