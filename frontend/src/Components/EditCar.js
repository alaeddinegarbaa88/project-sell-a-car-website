import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editCar, getCars } from "../Api/CarApi";
import { setCars } from "../redux/Store/CarSlice";

const EditCar = () => {
  const Cars = useSelector((state) => state.Car);
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
      <h1>Edit Car</h1>
      <Container style={{ margin: "40px" }}>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            {Car ? <EditForm Car={Car} id={id} /> : null}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

function EditForm({ Car, id }) {
  const navigate = useNavigate();

  const [name, setName] = useState(Car.name);
  const [image, setImage] = useState(
    Car.image && Car.image.length > 0 ? Car.image[0] : ""
  );
  const [price, setPrice] = useState(Car.price);
  const [fuelType, setFuelType] = useState(Car.fuelType);
  const [capacity, setCapacity] = useState(Car.capacity);

  const handleEdit = async (Car) => {
    toast.loading("Editing...");
    await editCar(id, Car);
    toast.success("Car Edited!");
    navigate("/");
  };

  return (
    <Form novalidate>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control
          defaultValue={Car.name}
          onChange={(e) => setName(e.target.value)}
          aria-label="Default select example"
          type="text"
          placeholder="Place the name of car"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>image</Form.Label>
        <Form.Control
          onChange={(e) => setImage(e.target.value)}
          defaultValue={Car.image}
          required
        />
      </Form.Group>
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
      </Form.Group>
      <Button
        variant="primary"
        onClick={() => {
          handleEdit({ name, image, fuelType, capacity, price });
        }}
      >
        Edit
      </Button>
    </Form>
  );
}

export default EditCar;
