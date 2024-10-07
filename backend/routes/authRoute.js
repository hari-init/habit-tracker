const express = require("express");
const router = express.Router();
const { authCheck } = require("../controllers/authController");

router.post("/authCheck", authCheck);

module.exports = router;
