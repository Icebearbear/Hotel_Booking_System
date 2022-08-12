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
  const [validated, setValidated] = useState(false);
  const [emailFeedback, setEmailFb] = useState("Please input a valid email");
  const [pwdFeedback, setPwdFb] = useState("Please input a password");

  const navigate = useNavigate();
  const handleClose = () => setError(false);

  const updateEmail = (errMsg) => {
    setEmail("");
    setEmailFb(errMsg);
  };
  const updatePwd = (errMsg) => {
    setPassword("");
    setPwdFb(errMsg);
  };
  const updateError = (errMsg) => {
    setError(true);
    setErrorMsg(errMsg);
  };

  const onSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      // check input field validation. if true, then stop progressing forward, show error
      event.preventDefault();
      event.stopPropagation();
      console.log("stuck");
    }
    setValidated(true);

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
          updateError(res);
        }
      })
      .catch((error) => {
        console.log(error.response);
        const errM = error.response.data.code.split("/")[1].split("-");
        var errMsg = "";
        errM.forEach((x) => (errMsg = errMsg + " " + x));
        errMsg.includes("email") ? updateEmail(errMsg) : updatePwd(errMsg);
        updateError(errMsg);
      });
  };

  return (
    <div className="container mb-4 p-3 d-flex justify-content-center">
      <Card style={{ width: "30rem", height: "35rem" }}>
        <Card.Body>
          <h1>Register page</h1>
          <Form noValidate validated={validated}>
            <Form.Group className="mb-3" controlId="formBasicFname">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                value={fname}
                onChange={(e) => setFName(e.target.value)}
                type="string"
                placeholder="Enter First Name"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please input first name
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLname">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                value={lname}
                onChange={(e) => setLName(e.target.value)}
                type="string"
                placeholder="Enter Last Name"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please input last name
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
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

            <Button
              onClick={onSubmit}
              variant="primary"
              className="float-right"
            >
              Submit
            </Button>

            <div className="reg-link">
              <Link className="link" to="/login">
                <h7 class="text-muted">
                  <u>Login</u>
                </h7>
                {/* <li>Login</li> */}
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
