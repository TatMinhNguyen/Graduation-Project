const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();
dotenv.config();

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const friendRoute = require("./routes/friend");
const postRoute = require('./routes/post');

const path = require("path");

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('CONNECTED TO MONGO DB!'));

app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Endpoint để phục vụ file tĩnh
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ROUTES
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/friend", friendRoute);
app.use("/api/post", postRoute);

app.listen(8000, () => {
    console.log("Server is running");
});
