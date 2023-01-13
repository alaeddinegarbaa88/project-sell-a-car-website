const mongoose = require("mongoose");

const reservationSchema = mongoose.Schema({
  name: String,

  user: {
    type: String,
    required: true,
  },

  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car",
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("reservation", reservationSchema);
