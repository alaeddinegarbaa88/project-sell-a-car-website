import React from "react";
import { getUser, UserLogin } from "../Api/UserApi";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/Store/UserSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handlelogin = async () => {
    const res = await UserLogin({ email, password });
    // Getting the token and save it in the localStorage under the name of token as a key
    const token = res.data.token;
    localStorage.setItem("token", token);
    const user = await getUser();
    dispatch(setUser(user));
    navigate("/");
  };
  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Button variant="primary" onClick={() => handlelogin()}>
          Connexion
        </Button>
        <div className="form-group">
          <p>
            {" "}
            Don't have an account?{" "}
            <a href="/Register" className="form-link">
              Here for Register
            </a>
          </p>
        </div>
      </Form>
    </div>
  );
};

export default Login;
