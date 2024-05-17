const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();
dotenv.config();

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user")

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('CONNECTED TO MONGO DB!'));

app.use(cors());
app.use(cookieParser());
app.use(express.json());

//ROUTES
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

app.listen(8000, () => {
    console.log("Server is running");
});