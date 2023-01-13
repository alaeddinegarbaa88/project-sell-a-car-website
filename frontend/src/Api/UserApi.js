import axios from "axios";
import toast from "react-hot-toast";

export const createUser = async (newUser) => {
  const user = await axios.post("http://localhost:5000/auth/user/register", {
    ...newUser,
  });
  return user;
};

export const UserLogin = async (log) => {
  const logged = await axios.post("http://localhost:5000/auth/user/login", log);

  // Show toast after getting the result
  toast.success("LoggedIn !");
  return logged;
};

export const getUser = async () => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.get(
      `http://localhost:5000/auth/user/getaUser`,
      { headers: { Authorization: token } }
    );

    return data;
  } catch {
    return null;
  }
};

export const getUsers = async () => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.get(
      `http://localhost:5000/auth/user/getaUsers`,
      { headers: { Authorization: token } }
    );

    return data;
  } catch {
    return null;
  }
};

export const fetchAccount = async () => {
  const token = localStorage.getItem("token");
  const { data } = await axios.get(
    `http://localhost:5000/auth/user/getaUser/`,
    { headers: { Authorization: token } }
  );
  return data;
};

export const deleteUser = async (id) => {
  const token = localStorage.getItem("token");
  const { data } = await axios.delete(
    `http://localhost:5000/auth/user/deleteUser/${id}`,
    { headers: { Authorization: token } }
  );

  toast.success("User Deleted !");
  return data;
};
