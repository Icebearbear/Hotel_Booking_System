import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleClose = () => setError(false);
  const onSubmit = () => {
    const userObject = {
      email: email,
      password: password,
    };
    axios
      .post("http://localhost:3001/login", userObject)
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("USER_ID", res.data.userId); // store data from localStorage temporarily
          localStorage.setItem("USER_EMAIL", res.data.email); // store data from localStorage temporarily
          navigate("/searchhotel");
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
    setError("");
    setErrorMsg("");
  };
  return (
    <div className="d-flex justify-content-around">
      <Card style={{ width: "30rem", height: "30rem" }}>
        <Card.Body>
          <h1>Login page</h1>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                value={email}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Keep me signed in" />
            </Form.Group>
            <Button
              onClick={onSubmit}
              variant="primary"
              className="float-right"
            >
              Submit
            </Button>
          </Form>
          <div className="reg-link">
            <Link className="link" to="/registration">
              <li>Register Now</li>
            </Link>
          </div>
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

export default Login;
