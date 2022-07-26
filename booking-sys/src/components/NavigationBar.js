import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";
import axios from "axios";
const NavigationBar = () => {
  const [login, setLogin] = useState(false);
  const [uid, setUid] = useState("");
  const getUser = async () => {
    try {
      await axios.get("http://localhost:3001/getSession").then((res) => {
        setLogin(res.data.login);
        localStorage.setItem("LOGIN", true);
        if (login) {
          setUid(res.data.uid);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("VAVBAR LOGIN ", login);
    console.log("VAVBAR UID ", uid);
    getUser();
  }, [setLogin, setUid]);

  return (
    <Navbar bg="dark" id="nav-bar">
      <Navbar.Collapse className="justify-content-end">
        {login ? (
          <Nav.Link href="/userspage">
            <Button variant="warning">User Profile</Button>
          </Nav.Link>
        ) : (
          <Nav.Link href="/login">
            <Button variant="warning">Login/Register</Button>
          </Nav.Link>
        )}
        {"  "}

        {/* <Nav.Link href="/login">
          <Button variant="info">Login/Register</Button>
        </Nav.Link>
        {"  "} */}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
