import axios from "axios";

export const addCar = async (car) => {
  const added = await axios.post("http://localhost:5000/cars/newCar", {
    ...car,
  });
};

export const getCars = async () => {
  const { data } = await axios.get("http://localhost:5000/cars/getAll");
  return data;
};
export const editCar = async (id, obj) => {
  const edited = await axios.put(
    `http://localhost:5000/cars/editCar/${id}`,
    obj
  );
};
export const deleteCar = async (id) => {
  const deleted = await axios.delete(
    `http://localhost:5000/cars/deleteCar/${id}`
  );
};
