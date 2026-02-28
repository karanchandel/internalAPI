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
  dob: { type: String } 
}, { timestamps: true });

module.exports = mongoose.model("UserData", UserSchema);
