import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCars } from "../Api/CarApi";

import { setCars } from "../redux/Store/CarSlice";
import { setUser } from "../redux/Store/UserSlice";
import CardCars from "./CardCars";
const Home = () => {
  //Call hooks
  const dispatch = useDispatch();
  //Call car state from store
  const Cars = useSelector((state) => state.Car);
  //get data and set it in the store of cars
  const getAllcar = async () => {
    const data = await getCars();
    dispatch(setCars(data));
  };
  useEffect(() => {
    getAllcar();
  }, []);

  console.log("cars", Cars);
  return (
    <div>
      <div className="slider">
        <div className="left">
          <h1 className="title"> CARS FOR YOU</h1>
        </div>
        <div className="right">
          <img
            src="https://www.auto-plus.tn/assets/modules/newcars/peugeot/308-gt-line/couverture/peugeot-308-gt-line.jpg"
            alt="car 308"
          />
        </div>
      </div>
      <div>
        <div className="content">
          <div className="content-row">
            <h1 className="big-tilte">Top Cars for Sell</h1>
          </div>
          <div className="content-row"></div>
          <div className="content-row">
            <div>VARIETY OF CARS</div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna
            </p>
          </div>
          <div className="carss">
            {Cars.map((e) => (
              <CardCars cars={e} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
