const express = require("express");
const cors = require("cors");
require("dotenv").config();
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const habitRoute = require("./routes/habitRoute");

const app = express();
const port = process.env.PORT || 3001;

app.use(
  cors({
    origin:
      process.env.CLIENT_URL ||
      "https://habit-tracker-1-3rpy.onrender.com" ||
      "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

//Routes
app.use("/", authRoute);
app.use("/", userRoute);
app.use("/", habitRoute);

//Listen
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
