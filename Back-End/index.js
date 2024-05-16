const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();
dotenv.config();

const authRoute = require("./routes/auth");

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('CONNECTED TO MONGO DB!'));

app.use(cors());
app.use(cookieParser());
app.use(express.json());

//ROUTES
app.use("/api/auth", authRoute);

app.listen(8000, () => {
    console.log("Server is running");
});