const billsModel = require('../models/billsModel');



//Add Bill
const addBillsController = async (req, res) => {
  try {
    const newBill = new billsModel(req.body);
    await newBill.save();
    res.send('Bill Created Successfully!');
  } catch (error) {
    res.send('Something went wrong');
    console.log('====================================');
    console.log(error);
    console.log('====================================');
  }
};

//Get bills data
const getBillsController = async (req, res) => {
  try {
    const bills = await billsModel.find();
    res.send(bills);
  } catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
  }
};



module.exports = { 
  addBillsController,
  getBillsController,

};
