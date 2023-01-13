import axios from "axios";
import { toast } from "react-hot-toast";

export const addReservation = async (data) => {
  await axios.post("http://localhost:5000/reservations", {
    ...data,
  });
};

export const getReservations = async () => {
  const { data } = await axios.get("http://localhost:5000/reservations/all");
  return data;
};
