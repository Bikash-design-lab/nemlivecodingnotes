const mongoose = require("mongoose");

const connecToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected To DB");
  } catch (err) {
    console.log("Failed To Connect To DB");
  }
};

module.exports = connecToDb;
