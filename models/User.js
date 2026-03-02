// models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  employment: { type: String },
  pan: { type: String },
  pincode: { type: String },
  state: { type: String },
  gender: { type: String },
  city: { type: String },
  income: { type: String },
  dob: { type: String },

  creditScore: { type: Number },
  salaryType: { type: String },
  companyName: { type: String },
  userPosition: { type: String },
  companyAddress: { type: String },
  completeAddress: { type: String },
  partnerId: { type: String },
  alreadyPushedToZype: { type: Boolean, default: false },
  zypeResponses: { type: Array, default: [] },
}, { timestamps: true });

module.exports = mongoose.model("UserData", UserSchema); // ya "User"
