import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../Api/UserApi";
import { getReservations } from "../Api/ReservationApi";

const Reservations = () => {
  const dispatch = useDispatch();

  const [reservations, setReservations] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const data = await getReservations();
      if (data) {
        setReservations(data);
      }
    };
    fetch();
  }, [dispatch]);

  if (!reservations) return null;

  return (
    <div class="" style={{ width: "80vw", margin: "auto", padding: "20px 0" }}>
      Reservations List: {reservations.length}
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Car</th>
            <th scope="col">User</th>
            <th scope="col">Phone</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((r) => (
            <tr>
              <th scope="row" title={r._id}>
                {r._id ? r._id.slice(0, 6) : ""}..
              </th>
              <td>
                {r.car.name} (price: {r.car.price})
              </td>
              <td>{r.user}</td>
              <td>{r.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reservations;
