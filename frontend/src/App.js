import React, { useEffect } from "react";
import "./App.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Car from "./Pages/Car";
import Register from "./Pages/Register";
import Error from "./Components/Error";
import NotFound from "./Components/NotFound";
import PrivateRoute from "./Components/PrivateRoute";
import AddCar from "./Components/AddCar";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Layout from "./Components/Layout";
import EditCar from "./Components/EditCar";
import { useDispatch } from "react-redux";
import { getUser } from "./Api/UserApi";
import { setUser } from "./redux/Store/UserSlice";
import Users from "./Pages/users";
import BuyCar from "./Components/BuyCar";
import Reservations from "./Pages/reservations";

function App() {
  // get user
  const dispatch = useDispatch();

  useEffect(() => {
    const getUsers = async () => {
      const data = await getUser();
      if (data) {
        dispatch(setUser(data));
      } else {
        dispatch(setUser(null));
      }
    };
    getUsers();
  }, [dispatch]);

  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/add"
            element={
              <PrivateRoute role="Admin">
                <AddCar />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <PrivateRoute role="Admin">
                <EditCar />
              </PrivateRoute>
            }
          />
          <Route
            path="/buy/:id"
            element={
              <PrivateRoute>
                <BuyCar />
              </PrivateRoute>
            }
          />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route
            path="/userslist"
            element={
              <PrivateRoute role="Admin">
                <Users />
              </PrivateRoute>
            }
          />

          <Route
            path="/reservations"
            element={
              <PrivateRoute role="Admin">
                <Reservations />
              </PrivateRoute>
            }
          />

          <Route path="/Car" element={<Car />} />
          <Route path="/error" element={<Error />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
