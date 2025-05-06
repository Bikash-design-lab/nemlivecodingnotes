const mongoose = require("mongoose");

const connectToDB = async () => {
  try{
   await mongoose.connect(process.env.MONGO_URI);
     console.log("Connected To DB");
  }catch(err){
    console.log("Failed to connect DB");
  }
};

const connectToDB1 = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected To DB"))
    .catch(() => {
      console.log("Failed to connect DB");
    });
};


module.exports = connectToDB;
