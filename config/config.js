const mongoose = require("mongoose");
require("colors");



//connectingDB Function

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log('====================================');
    console.log(`MongoDB Connected ${conn.connection.host}`.bgYellow);
    console.log('====================================');
  } catch (error) {
    console.log('====================================');
    console.log(`Error : ${error.message}`.bgRed);
    console.log('====================================');
    process.exit(1);
  }
};

//export db connection
module.exports = connectDb;
