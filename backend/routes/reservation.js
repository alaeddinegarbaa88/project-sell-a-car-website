const express = require("express");
const {
  undefinedError,
  AddReservation,
  getAllReservations,
} = require("../controllers/reservations");

const ReservationsRouter = express.Router();

//Request Methodes
ReservationsRouter.get("/", undefinedError);
ReservationsRouter.post("/", AddReservation);
ReservationsRouter.get("/all", getAllReservations);

module.exports = ReservationsRouter;
