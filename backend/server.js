const express = require("express");
const cors = require("cors");
require("dotenv").config();
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({ 
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
 }));
app.use(express.json());

//Routes
app.use("/", authRoute);
app.use("/", userRoute);

//Listen
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
