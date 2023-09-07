const mongoose = require("mongoose");

const DB = 'mongodb://127.0.0.1:27017/chatApp';

mongoose
  .connect(DB)
  .then(() => {
    console.log("Connection Success");
  })
  .catch((err) => {
    console.log("Connection Fail "+err.message);
  });