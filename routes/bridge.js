// routes/bridge.js
const express = require("express");
const User = require("../models/User");
const { pushUserToZype } = require("../utils/pushToZypeApi");

const router = express.Router();

// API: DB se data fetch karke zype API par push
router.get("/sync-to-zype", async (req, res) => {
  try {
    const users = await User.find({});

    if (users.length === 0) {
      return res.status(200).json({
        message: "No users in DB",
        count: 0
      });
    }

    const results = [];
    for (let user of users) {
      const result = await pushUserToZype(user);
      results.push(result);
    }

    return res.status(200).json({
      message: "Synced to Zype API",
      processed: users.length,
      results
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;
