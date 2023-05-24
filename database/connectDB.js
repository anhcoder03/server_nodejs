const mongoose = require("mongoose");
require("dotenv").config();

async function connect() {
  try {
    const connect = await mongoose.connect(
      `mongodb+srv://anhnppd06356:Anh16101982@cluster0.dmqwjwx.mongodb.net/`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(`MongoDB Connected`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
}

module.exports = { connect };
