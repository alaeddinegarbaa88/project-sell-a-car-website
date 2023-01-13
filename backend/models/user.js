const mongoose = require("mongoose");
//create user schema and role

const userSchema = mongoose.Schema({
  name: String,

  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "Custommer",
  },
});

module.exports = mongoose.model("user", userSchema);
