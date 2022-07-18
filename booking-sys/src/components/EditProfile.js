import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import { InputGroup } from "react-bootstrap";

function EditProfile() {
  const navigate = useNavigate();
  const info = localStorage.getItem("USER_DB_ACCOUNT"); /// get the object from localStorage
  const userDbInfo = JSON.parse(info);

  // set initial value as the current user account info
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [validated, setValidated] = useState(false);
  const [emailFeedback, setEmailFb] = useState("Please input a valid email");
  const handleClose = () => setError(false);

  const onSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      console.log("stuck");
    }
    setValidated(true);

    const updatedUserInfo = {
      /// new object of updated values and pass to backend to update user db account
      first_name: fname,
      last_name: lname,
      email: email,
      uid: userDbInfo.uid,
      dbDocId: userDbInfo.dbdocId,
    };
    axios
      .post("http://localhost:3001/edituser", updatedUserInfo)
      .then((res) => {
        if (res.status === 200) {
          navigate("/userprofile"); /// return to profile page once update is done
          console.log(res);
        }
        if (res.status === 500) {
          setError(true);
          setErrorMsg(res);
        }
      })
      .catch((error) => {
        const errMsg = error.response.data.code.split("/")[1].split("-");
        handleError(errMsg);
        setError(true);
        setErrorMsg(errMsg[0] + " " + errMsg[1]);

        console.log(error);
      });
  };
  const handleError = (errMsg) => {
    if (errMsg[1] === "email") {
      setEmail("");
      setEmailFb(errMsg[0] + " " + errMsg[1]);
    }
  };
  return (
    <div class="container mt-4 mb-4 p-3 d-flex justify-content-center">
      <div class="card p-4">
        <div class="image d-flex flex-column justify-content-center align-items-center">
          <div>
            <h1>Edit Profile Page</h1>
            <p> </p>

            <Form noValidate validated={validated}>
              <Row className="mb-3">
                <Form.Group as={Col} className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="string"
                      placeholder={userDbInfo.first_name}
                      value={fname}
                      onChange={(e) => setFName(e.target.value)}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please input first name
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                <Form.Group as={Col} className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="string"
                    placeholder={userDbInfo.last_name}
                    value={lname}
                    onChange={(e) => setLName(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please input last name
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder={userDbInfo.email}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  {emailFeedback}
                </Form.Control.Feedback>
              </Form.Group>

              <Button variant="primary" onClick={onSubmit}>
                Update Profile
              </Button>
            </Form>
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
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
