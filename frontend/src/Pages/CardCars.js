import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CardCars = ({ cars }) => {
  const user = useSelector((state) => state.User);

  if (!user) return null;

  return (
    <div style={{ margin: "20px" }}>
      <div className="content-groups">
        <div className="card">
          <div className="card-body">
            <img src={cars.image} className="img-cars" alt="" />
          </div>
          <div className="card-footer">
            <div className="card-footer-top">
              <h3 className="car-title">{cars.name}</h3>
            </div>
            <div>fuelType : {cars.fuelType}</div>
            <div>capacity: {cars.capacity}</div>
            <div>price: {cars.price}</div>
            <div
              className="card-footer-bottom"
              style={{
                padding: "10px 0",
              }}
            >
              <Link
                className="rent-now"
                to={`/buy/${cars._id}`}
                style={{ textDecoration: "none" }}
              >
                Buy Now
              </Link>
              {user.role === "Admin" ? (
                <Link
                  className="rent-now"
                  to={`/edit/${cars._id}`}
                  style={{ textDecoration: "none" }}
                >
                  Edit
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCars;
