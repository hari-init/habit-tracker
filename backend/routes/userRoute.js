const express = require("express");
const router = express.Router();
const {
  createUser,
  getUser,
  updateUser,
} = require("../controllers/userController");

router.post("/createUser", createUser);
router.get("/user/:email", getUser);
router.put("/updateUser/:email", updateUser);

module.exports = router;
