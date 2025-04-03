const mongoose = require("mongoose");

const connectToDb = ()=>{
    mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to DB ");
  })
  .catch((err) => {
    console.log("err in connecting DB");
    console.log(err);
  });

}

module.exports = connectToDb;