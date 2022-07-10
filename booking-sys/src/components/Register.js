import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

import { Link, useNavigate } from "react-router-dom";
// import "../App.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const handleClose = () => setError(false);

  const onSubmit = () => {
    const userObject = {
      first_name: fname,
      last_name: lname,
      email: email,
      password: password,
    };
    axios
      .post("http://localhost:3001/register", userObject)
      .then((res) => {
        if (res.status === 200) {
          navigate("/login");
        }
        if (res.status === 500) {
          setError(true);
          setErrorMsg(res);
        }
      })
      .catch((error) => {
        setError(true);
        setErrorMsg(error.response.data.code);
      });
    setEmail("");
    setPassword("");
    setFName("");
    setLName("");
  };

  return (
    <div className="d-flex justify-content-around">
      <Card style={{ width: "30rem", height: "30rem" }}>
        <Card.Body>
          <h1>Register page</h1>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicFname">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                value={fname}
                onChange={(e) => setFName(e.target.value)}
                type="string"
                placeholder="Enter First Name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLname">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                value={lname}
                onChange={(e) => setLName(e.target.value)}
                type="string"
                placeholder="Enter Last Name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />
            </Form.Group>

            <Button
              onClick={onSubmit}
              variant="primary"
              className="float-right"
            >
              Submit
            </Button>
            <div className="reg-link">
              <Link className="link" to="/login">
                <li>Login</li>
              </Link>
            </div>
          </Form>
        </Card.Body>
      </Card>

      <Modal show={error} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Error!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {"Error: " + errorMsg + ". Please input correct data "}{" "}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Register;
