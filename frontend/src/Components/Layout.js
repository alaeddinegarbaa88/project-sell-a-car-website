import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/Store/UserSlice";

const Layout = (props) => {
  const navigate = useNavigate();
  //get user details from the store
  const user = useSelector((state) => state.User);

  // logout function
  const handleLogout = () => {
    //remove the token
    localStorage.removeItem("token");
    //navigate to the login page
    navigate("/Login");
  };

  return (
    <div>
      <Navbar className="header" bg="dark" variant="dark">
        <Navigation />
      </Navbar>

      <div className="main">{props.children}</div>
      <div className="footer">
        <p>&copy;2023.All rights reserved. Powered by GARBAA Alaeddine</p>
      </div>
    </div>
  );
};

export default Layout;

function Navigation() {
  const navigate = useNavigate();
  //get user details from the store
  const user = useSelector((state) => state.User);
  const dispatch = useDispatch();

  // logout function
  const handleLogout = () => {
    //remove the token
    localStorage.removeItem("token");
    //navigate to the login page

    dispatch(setUser(null));

    navigate("/Login");
  };

  console.log({ user });
  if (!user) return null;

  if (user && !user.isAuth)
    return (
      <Container>
        <Navbar.Brand as={Link} to="/">
          CARS FOR YOU
        </Navbar.Brand>
        <Nav variant="pills">
          <Nav.Item className="justify-content-end">
            <Nav.Link as={Link} to="/Login">
              LogIn
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/Register">
              SignUp
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
    );

  if (user && user.role !== "Admin") {
    return (
      <Container>
        <Navbar.Brand as={Link} to="/">
          CARS FOR YOU
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          <NavDropdown
            id="nav-dropdown-dark-example"
            title={<Navbar.Text>Signed in as: {user.name}</Navbar.Text>}
          >
            <NavDropdown.Item onClick={() => handleLogout()}>
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    );
  }

  return (
    <Container>
      <Navbar.Brand as={Link} to="/">
        CARS FOR YOU
      </Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link as={Link} to="/">
          Home
        </Nav.Link>

        <Nav.Link as={Link} to="/add">
          Add Car
        </Nav.Link>

        <Nav.Link as={Link} to="/userslist">
          Clients
        </Nav.Link>

        <Nav.Link as={Link} to="/reservations">
          Reservations
        </Nav.Link>
      </Nav>
      <Navbar.Collapse className="justify-content-end">
        <NavDropdown
          id="nav-dropdown-dark-example"
          title={<Navbar.Text>Signed in as: {user.name}</Navbar.Text>}
        >
          <NavDropdown.Item onClick={() => handleLogout()}>
            Logout
          </NavDropdown.Item>
        </NavDropdown>
      </Navbar.Collapse>
    </Container>
  );
}
