import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { InputGroup } from "react-bootstrap";
import "../css/login.min.css";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false); // boolean if there is error
  const [errorMsg, setErrorMsg] = useState(""); // for Modal (pop-up) to show error
  const [emailFeedback, setEmailFb] = useState("Please input a valid email"); // for input field validation feedback
  const [pwdFeedback, setPwdFb] = useState("Please input a password"); // for input field validation feedback
  const [validated, setValidated] = useState(false); //for input field validation
  const [validity, setValidity] = useState(false); //for input field validation

  // console.log("LOGINNN");
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
      event.preventDefault();
      event.stopPropagation();
      console.log("stuck");
      setValidity(form.checkValidity());
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
          localStorage.setItem("LOGIN", true);
          console.log("ONSUBMIT222");

          // document.getElementById("nav-bar").style.display = "none";
          navigate(-1);
        }
        if (res.status === 500) {
          updateError(res);
        }
      })
      .catch((error) => {
        console.log("ERRORR", error);
        const errM = error.response.data.code.split("/")[1].split("-");
        var errMsg = "";
        errM.forEach((x) => (errMsg = errMsg + " " + x));
        if (errMsg.includes("email")) {
          updateEmail(errMsg);
        }
        if (errMsg.includes("password")) {
          updatePwd(errMsg);
        } else {
          updateEmail(errMsg);
          updatePwd("");
        }

        updateError(errMsg);
      });
  };

  return (
    <div className="wrapper" data-testid="login-page">
      <div className="container mb-4 p-3 d-flex justify-content-center">
        <Card className="card-login">
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
                  <Form.Control.Feedback
                    type="invalid"
                    role="alert"
                    data-validity={validity}
                    data-testid="fb-email"
                  >
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
                <Form.Control.Feedback
                  type="invalid"
                  role="alert"
                  data-validity={validity}
                  data-testid="fb-pwd"
                >
                  {pwdFeedback}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Keep me signed in" />
              </Form.Group>

              <div>
                <Button
                  onClick={onSubmit}
                  variant="primary"
                  className="float-right"
                >
                  Submit
                </Button>
              </div>
              <div className="reg-link">
                <Link className="link" to="/registration">
                  <li>Register Now</li>
                </Link>
              </div>
            </Form>
          </Card.Body>
        </Card>

        {/* <Modal show={error} onHide={handleClose}>
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
        </Modal> */}
      </div>
    </div>
  );
}

export default Login;
