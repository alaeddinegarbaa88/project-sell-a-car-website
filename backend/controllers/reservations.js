const reservationSchema = require("../models/reservation");

exports.undefinedError = (req, res) => {
  try {
    res.send("Something Went Wrong");
  } catch (err) {
    console.log(err);
  }
};

exports.AddReservation = async (req, res) => {
  try {
    console.log("req.body", req.body);
    const newReservation = new reservationSchema(req.body);
    await newReservation.save();
    res
      .status(200)
      .send({ msg: "the new Reservation has been succesfully added" });
  } catch (err) {
    res.status(500).send("there is a problem in adding");
    console.log(err);
  }
};

exports.getAllReservations = async (req, res) => {
  try {
    const data = await reservationSchema.find().populate("car");

    res.status(200).send(data);
  } catch (err) {
    res.status(500).send("error in get all");
    console.log(err);
  }
};
