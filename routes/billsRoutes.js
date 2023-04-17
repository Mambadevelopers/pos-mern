const express = require("express");
const { 
  addBillsController,
  getBillsController
} = require("./../controllers/billsController");



const router = express.Router();

//Routes
//Method = get
router.post("/add-bills", addBillsController);

//Method = Get
router.get("/get-bills", getBillsController);


module.exports = router;
