import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";
const NavigationBar = () => {
  return (
    <Navbar bg="dark">
      <Navbar.Collapse className="justify-content-end">
        {"  "}
        <Nav.Link href="/bookinghistory">
          <Button variant="warning">List bookings</Button> {"  "}
        </Nav.Link>
        {"  "}

        <Nav.Link href="/login">
          <Button variant="info">Login/Register</Button>
        </Nav.Link>
        {"  "}

        <Nav.Link href="/userprofile">
          <Button variant="info">User Profile</Button>
        </Nav.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
