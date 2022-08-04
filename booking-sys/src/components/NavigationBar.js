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
        console.log("navaaaaa", res.data.login);
        if (login == true) {
          setUid(res.data.uid);
          localStorage.setItem("LOGIN", true); // read by other pages to handle user session
        } else {
          localStorage.setItem("LOGIN", false); // read by other pages to handle user session
        }
        console.log("navaaaaLLa", localStorage.getItem("LOGIN"));
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("VAVBAR LOGIN ", login);
    console.log("VAVBAR UID ", uid);
    getUser();
  }, [login, uid]);

  return (
    <div data-testid="userprofile">
      <Navbar bg="dark" id="nav-bar">
        <Navbar.Collapse className="justify-content-end">
          {login ? (
            <Nav.Link href="/userspage">
              <Button variant="warning">User Profile</Button>
            </Nav.Link>
          ) : (
            <Nav.Link href="/login" data-testid="loginreg">
              <Button variant="warning">Login/Register</Button>
            </Nav.Link>
          )}
          {"  "}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
