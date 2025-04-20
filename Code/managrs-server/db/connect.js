const mongoose = require('mongoose');
require('dotenv').config();

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to Cosmos DB");
  } catch (err) {
    console.error("DB Connection Failed:", err.message);
  }
};

module.exports = connectToDB;
