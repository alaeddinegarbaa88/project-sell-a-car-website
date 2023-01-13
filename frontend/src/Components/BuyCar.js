import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCars } from "../Api/CarApi";
import { addReservation } from "../Api/ReservationApi";

import { setCars } from "../redux/Store/CarSlice";

const BuyCar = () => {
  const Cars = useSelector((state) => state.Car);
  const user = useSelector((state) => state.User);

  const dispatch = useDispatch();
  const getAllcar = async () => {
    const data = await getCars();
    dispatch(setCars(data));
  };
  useEffect(() => {
    getAllcar();
  }, []);

  const { id } = useParams();
  const [Car, setCar] = useState();

  useEffect(() => {
    setCar(Cars.find((e) => e._id === id));
  }, [Cars, id]);

  if (!Car) return null;

  return (
    <div>
      <h1>Buy Car</h1>
      <Container style={{ margin: "40px" }}>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            {Car ? <BuyForm Car={Car} id={id} user={user} /> : null}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

function BuyForm({ user, Car, id }) {
  const navigate = useNavigate();

  const [name, setName] = useState(Car.name);
  const [fullname, setFullName] = useState(user.name);
  const [phone, setPhone] = useState("");

  const handleBuy = async (data) => {
    await addReservation(data);
    navigate("/");
  };

  return (
    <Form novalidate>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Car Name</Form.Label>
        <Form.Control
          defaultValue={Car.name}
          onChange={(e) => setName(e.target.value)}
          aria-label="Default select example"
          type="text"
          placeholder="Place the name of car"
          disabled
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Full name</Form.Label>
        <Form.Control
          onChange={(e) => setFullName(e.target.value)}
          defaultValue={user.name}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control onChange={(e) => setPhone(e.target.value)} required />
      </Form.Group>
      {/* 
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Price</Form.Label>
        <Form.Control
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          defaultValue={Car.price}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>FuelType</Form.Label>
        <Form.Select
          onChange={(e) => setFuelType(e.target.value)}
          aria-label="Default select "
        >
          <option>Choose Category </option>
          <option value="Petrol">Petrol</option>
          <option value="Gasoil">Gasoil</option>
          defaultValue={Car.fuelType}
          required
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Capacity</Form.Label>
        <Form.Control
          onChange={(e) => setCapacity(e.target.value)}
          type="number"
          defaultValue={Car.capacity}
          required
        />
      </Form.Group> */}
      <Button
        variant="primary"
        onClick={() => {
          if (!fullname || !phone)
            return toast.error("Please fill all the fields");
          handleBuy({ car: Car._id, user: fullname, phone });
        }}
      >
        Buy
      </Button>
    </Form>
  );
}

export default BuyCar;
