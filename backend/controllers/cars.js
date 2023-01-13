const carsSchema = require("../models/car");

exports.undefinedError = (req, res) => {
  try {
    res.send("Something Went Wrong");
  } catch (err) {
    console.log(err);
  }
};

exports.AddCars = async (req, res) => {
  try {
    const newCar = new carsSchema(req.body);
    await newCar.save();
    res
      .status(200)
      .send({ msg: "the new Car has been succesfully added", newCar });
  } catch (err) {
    res.status(500).send("there is a problem in adding");
    console.log(err);
  }
};

exports.getAllCars = async (req, res) => {
  try {
    const Cars = await carsSchema.find();
    res.status(200).send(Cars);
  } catch (err) {
    res.status(500).send("error in get all");
    console.log(err);
  }
};

exports.getCarById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id, "our id");
    const Car = await carsSchema.findById(id);
    res.status(200).send(Car);
  } catch (err) {
    console.log(err);
    res.status(500).send("there is no such Car");
  }
};

exports.editCar = async (req, res) => {
  try {
    const { id } = req.params;
    await carsSchema.findByIdAndUpdate(id, { $set: { ...req.body } });
    res.status(200).send("The Car updated succesfully");
  } catch (err) {
    res.status(500).send("can't update");
    console.log(err);
  }
};

exports.deleteCar = async (req, res) => {
  try {
    const { id } = req.params;
    await carsSchema.findByIdAndRemove(id);
    res.status(200).send("The Car has been removed");
  } catch (err) {
    res.status(500).send("cannot delete the selected Car");
    console.log(err);
  }
};
