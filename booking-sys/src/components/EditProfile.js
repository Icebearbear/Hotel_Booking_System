import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
function EditProfile() {
  const navigate = useNavigate();
  const info = localStorage.getItem("USER_DB_ACCOUNT"); /// get the object from localStorage
  const userDbInfo = JSON.parse(info);

  // set initial value as the current user account info
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [email, setEmail] = useState("");

  const onSubmit = () => {
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
        navigate("/userprofile"); /// return to profile page once update is done
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div class="container mt-4 mb-4 p-3 d-flex justify-content-center">
      <div class="card p-4">
        <div class="image d-flex flex-column justify-content-center align-items-center">
          <div>
            <h1>Edit Profile Page</h1>
            <p> </p>

            <Form>
              <Row className="mb-3">
                <Form.Group as={Col} className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="string"
                    placeholder={userDbInfo.first_name}
                    value={fname}
                    onChange={(e) => setFName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group as={Col} className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="string"
                    placeholder={userDbInfo.last_name}
                    value={lname}
                    onChange={(e) => setLName(e.target.value)}
                  />
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
              </Form.Group>

              <Button variant="primary" onClick={onSubmit}>
                Update Profile
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
