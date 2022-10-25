const blogsRouter = require("./controller/blogs");
const config = require("./utils/config");
const cors = require("cors");
const express = require("express");
const app = express();
const logger = require("./utils/logger");
const middleware = require('./utils/middleware');
const mongoose = require("mongoose");
require("express-async-errors");

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.static("build"));
app.use(express.json());


app.use("/api/blog", blogsRouter);
app.use(middleware)

module.exports = app;
