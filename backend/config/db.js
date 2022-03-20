const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("connected to mongo db");
  } catch (error) {
    console.log(`error : ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectToDb;
