const mongoose = require("mongoose");

const blackListTokenSchema = new mongoose.Schema({
  token: String,
});

const BlackListTokenModel = mongoose.model("BlacklistedToken", blackListTokenSchema);
module.exports = BlackListTokenModel;
