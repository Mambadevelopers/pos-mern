const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDb = require("./config/config");
const itemModel = require("./models/itemModel");
const items = require("./utils/data");
require("colors");


//configuration
dotenv.config();
connectDb();



//Seeder function
const importData = async () => {
  try {
    await itemModel.deleteMany();
    const itemsData = await itemModel.insertMany(items);
    console.log('====================================');
    console.log("All Items Added".bgGreen);
    console.log('====================================');
    process.exit();
  } catch (error) {
    console.log('====================================');
    console.log(`${error}`.bgRed.inverse);
    console.log('====================================');
    process.exit(1);
  }
};

importData();
