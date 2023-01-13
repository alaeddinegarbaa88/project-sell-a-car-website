const express = require("express");
const {
  undefinedError,
  AddCars,
  getAllCars,
  getCarById,
  editCar,
  deleteCar,
} = require("../controllers/cars");

const CarsRouter = express.Router();

//Request Methodes
CarsRouter.get("/", undefinedError);
CarsRouter.post("/newCar", AddCars);
CarsRouter.get("/getAll", getAllCars);
CarsRouter.get("/getCar/:id", getCarById);
CarsRouter.put("/editCar/:id", editCar);
CarsRouter.delete("/deleteCar/:id", deleteCar);

//Add new user

//Login

module.exports = CarsRouter;
