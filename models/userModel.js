const mongoose = require("mongoose");

//User Schema for our model
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
    },
  },
  { timestamp: true }
);

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
