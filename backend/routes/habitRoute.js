const express = require("express");
const router = express.Router();
const { createHabit, getHabits,updateHabit } = require("../controllers/habitController");

router.post("/createHabit", createHabit);
router.get("/getHabits/:email", getHabits);
router.put("/updateHabit", updateHabit);
module.exports = router;
