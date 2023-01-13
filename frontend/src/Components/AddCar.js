import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { addCar } from "../Api/CarApi";

const AddCar = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [fuelType, setFuelType] = useState("");

  const [capacity, setCapacity] = useState("");

  const handleAdd = (car) => {
    console.log("clicked", car);
    toast.promise(addCar(car), {
      loading: "Adding...",
      success: <b>Car Added!</b>,
      error: <b>Could not Add.</b>,
    });
    navigate("/");
  };

  return (
    <div>
      <h1>Add Car</h1>
      <Container style={{ margin: "40px" }}>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  onChange={(e) => setName(e.target.value)}
                  aria-label="Default select example"
                  type="text"
                  placeholder="Place the name of car"
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>image</Form.Label>
                <Form.Control
                  onChange={(e) => setImage(e.target.value)}
                  type="text"
                  placeholder="set your image url"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  onChange={(e) => setPrice(e.target.value)}
                  type="Number"
                  placeholder="Set your price"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Fuel Type</Form.Label>
                <Form.Control
                  onChange={(e) => setFuelType(e.target.value)}
                  type="text"
                  placeholder="Set the fuel type"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Capacity</Form.Label>
                <Form.Control
                  onChange={(e) => setCapacity(e.target.value)}
                  type="number"
                  placeholder="...."
                />
              </Form.Group>
              <Button
                variant="primary"
                onClick={() =>
                  handleAdd({ name, image, price, fuelType, capacity })
                }
              >
                Add
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddCar;
