const express = require("express");
const cors = require("cors");
const conndb = require("./config/conn");
const CarsRouter = require("./routes/Cars");
const userRouter = require("./routes/user");
const reservationRouter = require("./routes/reservation");
const app = express();
const port = 5000;

app.use(cors());
require("dotenv").config();

//using json forma in the req and res
app.use(express.json());
app.use("/cars", CarsRouter);
app.use("/reservations", reservationRouter);
app.use("/auth/user", userRouter);

//call connection to db
conndb();

//listen server
app.listen(port, (err) => {
  err
    ? console.log(err)
    : console.log(`The server is running on . http://localhost:${port}`);
});
