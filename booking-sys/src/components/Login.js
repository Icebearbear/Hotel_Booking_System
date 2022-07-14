import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { InputGroup } from "react-bootstrap";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [emailFeedback, setEmailFb] = useState("Please input a valid email");
  const [pwdFeedback, setPwdFb] = useState("Please input a password");

  const navigate = useNavigate();

  const handleClose = () => setError(false);

  const [validated, setValidated] = useState(false);

  const onSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      console.log("stuck");
    }
    setValidated(true);

    console.log("ONSUBMIT");
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
        const errMsg = error.response.data.code.split("/")[1].split("-");
        handleError(errMsg);
        setError("");
        setErrorMsg("");
        setError(true);
        setErrorMsg(errMsg[0] + " " + errMsg[1]);
      });
  };

  const handleError = (errMsg) => {
    if (errMsg[1] === "email") {
      setEmail("");
      setEmailFb(errMsg[0] + " " + errMsg[1]);
    }
    if (errMsg[1] === "password") {
      setPassword("");
      setPwdFb(errMsg[0] + " " + errMsg[1]);
    }
  };

  return (
    <div class="d-flex justify-content-center">
      <Card style={{ width: "30rem", height: "30rem" }}>
        <Card.Body>
          <h1>Login page</h1>
          <Form noValidate validated={validated}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter email"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {emailFeedback}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                required
              />
              <Form.Control.Feedback type="invalid">
                {pwdFeedback}
              </Form.Control.Feedback>
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

            <div className="reg-link">
              <Link className="link" to="/registration">
                <li>Register Now</li>
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

export default Login;
