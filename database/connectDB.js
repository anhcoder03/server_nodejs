const mongoose = require("mongoose");
require("dotenv").config();

async function connect() {
  try {
    const connect = await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
}

module.exports = { connect };
