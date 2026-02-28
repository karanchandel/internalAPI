// routes/user.js
const express = require("express");
const User = require("../models/User");

const router = express.Router();

// POST /api/users
router.post("/create-user", async (req, res) => {
  try {
    const { 
      name, phone, email, employment, pan, pincode,
      state, gender, city, income, dob 
    } = req.body;

    const user = new User({
      name,
      phone,
      email,
      employment,
      pan,
      pincode,
      state,
      gender,
      city,
      income,
      dob
    });

    await user.save();
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;
