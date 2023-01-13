const mongoose = require("mongoose");

const carsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: [String],
      required: true,
    },

    fuelType: {
      type: String,
      required: true,
    },

    capacity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Car", carsSchema);
