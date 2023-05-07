const express = require("express");
const app = express();
const connectDB = require("./db/connection");
require("dotenv").config();
const router = require("./routes/routing");
const cookieParser = require("cookie-parser");

// cloudinary configs

// express configs
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// routing
app.use("/api", router);

// server
const port = process.env.PORT || 8080;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI).then(() => {
      console.log(`Connected to database`);
      app.listen(port, () => {
        console.log(`Server is listening on port ${port}...`);
      });
    });
  } catch (error) {}
};

start();