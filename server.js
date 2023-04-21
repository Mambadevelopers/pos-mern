const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotanv = require("dotenv");
const { bgCyan } = require("colors");
require("colors");
const connectDb = require("./config/config");

//dotenv configuration
dotanv.config();


//Mongodb configuration
connectDb();

//rest object
const app = express();

//App Middleware
app.use(cors({
  origin: ["https://posmamba-app.vercel.app"],
  credentials: true,
}));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));

//Item Routes
app.use("/api/items", require("./routes/itemRoutes"));

//UserRoute
app.use("/api/users", require("./routes/userRoutes"));

//Bill Route
app.use("/api/bills", require("./routes/billsRoutes"));

//Port
const PORT = process.env.PORT || 8080;

//Listen
app.listen(PORT, () => {
  console.log('====================================');
  console.log(`Server Running On Port ${PORT}`.bgCyan.white);
  console.log('====================================');
});
