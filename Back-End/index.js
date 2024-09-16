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
const commentRoute = require("./routes/comment"); 
const searchRoute = require('./routes/search');
const chatRoute = require('./routes/chat')

const path = require("path");
const imagekit = require("./utils/imagekitConfig");

mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Endpoint để phục vụ file tĩnh
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/authentication', (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
});

// ROUTES
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/friend", friendRoute);
app.use("/api/post", postRoute);
app.use("/api/comment", commentRoute)
app.use('/api/search', searchRoute)
app.use('/api/chat', chatRoute)

app.listen(8000, () => {
    console.log("Server is running");
});
