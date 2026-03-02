// syncToZype.js
const mongoose = require("mongoose");
require("dotenv").config();

const { pushUserToZype } = require("./utils/pushToZypeApi");
const User = require("./models/User"); 

const BATCH_SIZE = 100;

async function processBatch(users) {
  const promises = users.map(async (user) => {
    const result = await pushUserToZype(user);

    const update = {
      $push: {
        zypeResponses: {
          ...result.data,
          processedAt: new Date().toISOString(),
        },
      },
    };

    if (result.status === "success" || result.statusCode === 409) {
      // success + "User is already associated" dono case me mark as true
      update.$set = { alreadyPushedToZype: true };
    }

    await User.updateOne({ _id: user._id }, update);
  });

  await Promise.allSettled(promises);
}

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    let total = 0;
    let success = 0;

    while (true) {
      console.log("📦 Fetching next batch...");

      const users = await User.find({
        alreadyPushedToZype: { $ne: true },
      })
        .limit(BATCH_SIZE)
        .lean();

      if (users.length === 0) {
        console.log("🏁 All users processed.");
        break;
      }

      const beforeSuccess = success;

      await processBatch(users);

      const afterUsers = await User.find({
        alreadyPushedToZype: true,
      }).countDocuments();

      success = afterUsers;

      total += users.length;
      console.log(
        `📊 Stats -> Success marked: ${success} | Last Batch: ${users.length} | Total Seen: ${total}`
      );

      await new Promise((res) => setTimeout(res, 500));
    }
  } catch (err) {
    console.error("❌ Run error:", err.message);
  } finally {
    console.log("🔌 Closing MongoDB connection.");
    await mongoose.connection.close();
  }
}

run();
