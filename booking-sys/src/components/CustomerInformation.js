import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function CustomerInformation() {
  const [firstName, setFName] = useState("");
  const [lastName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [bookForSomeone, setBookforSomeone] = useState(false);
  const [smoking, setSmoking] = useState("");
  const [bed, setBed] = useState("");
  const [highFloor, setHighRoom] = useState(false);
  const [quiteRoom, setQuiteRoom] = useState(false);
  const [babyCotReq, setBabyCotRequest] = useState(false);
  const [airportTransfer, setAirportTransfer] = useState(false);
  const [extraReq, setExtraReq] = useState("");

  const custData = {
    bookForSomeone: bookForSomeone,
    smoking: smoking,
    bedType: bed,
    highFloor: highFloor,
    quiteRoom: quiteRoom,
    babyCotReq: babyCotReq,
    airportTransfer: airportTransfer,
    extraReq: extraReq,
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
    country: country,
  };

  return (
    <div className="d-flex justify-content-around">
      <Card style={{ width: "60rem", height: "60rem" }}>
        <Card.Body>
          {" "}
          Let us know who you are
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="string"
                  value={firstName}
                  onChange={(e) => setFName(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="string"
                  value={lastName}
                  onChange={(e) => setLName(e.target.value)}
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Double check for typos"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {/* <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text> */}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Retype Email </Form.Label>
              <Form.Control type="email" />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group
                as={Col}
                className="mb-3"
                controlId="formBasicRetypeEmail"
              >
                <Form.Label>Phone number optional</Form.Label>
                <Form.Control
                  type="integer"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Form.Group>

              <Form.Group
                as={Col}
                className="mb-3"
                controlId="formBasicCountry"
              >
                <Form.Label>Country/region of residence</Form.Label>
                <Form.Control
                  type="string"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Please tick if you are booking for someone else"
                value={true}
                onChange={(e) => setBookforSomeone(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} className="mb-3">
              Do you have smoking preferences
              <Row>
                <Col sm={2}>
                  <Form.Check
                    type="radio"
                    label="Non smoking"
                    name="NonSmokingRadio"
                    id="NonSmokingRadio"
                    value={false}
                    onChange={(e) => setSmoking(e.target.value)}
                  />
                </Col>
                <Col sm={2}>
                  <Form.Check
                    type="radio"
                    label="Smoking"
                    name="SmokingRadio"
                    id="SmokingRadio"
                    value={true}
                    onChange={(e) => setSmoking(e.target.value)}
                  />
                </Col>
              </Row>
            </Form.Group>

            <Form.Group as={Col} className="mb-3">
              What bed configuration do you prefer
              <Row>
                <Col sm={2}>
                  <Form.Check
                    type="radio"
                    label="Large bed"
                    name="LargeBedRadio"
                    id="LergeBedRadio"
                    value={"large"}
                    onChange={(e) => setBed(e.target.value)}
                  />
                </Col>
                <Col sm={2}>
                  <Form.Check
                    type="radio"
                    label="Twin bed"
                    name="TwinBedRadio"
                    id="TwinBedRadio"
                    value={"twin"}
                    onChange={(e) => setBed(e.target.value)}
                  />
                </Col>
              </Row>
            </Form.Group>

            <Card style={{ width: "58rem" }}>
              <Card.Body>
                Anymore requests?
                <Form.Group as={Col} className="mb-3">
                  <Row>
                    <Col sm={20}>
                      <Form.Check
                        type="checkbox"
                        label="High floor room please"
                        name="HighFLoorRoomRadio"
                        id="HighFLoorRoomRadio"
                        value={true}
                        onChange={(e) => setHighRoom(e.target.value)}
                      />
                    </Col>
                    <Col sm={20}>
                      <Form.Check
                        type="checkbox"
                        label="Quiet room"
                        name="QuietRoomRadio"
                        id="QuietRoomRadio"
                        value={true}
                        onChange={(e) => setQuiteRoom(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={10}>
                      <Form.Check
                        type="checkbox"
                        label="I Want Baby Bot (additional charges may apply)"
                        name="BabyCotRadio"
                        id="BabyCotRadio"
                        value={true}
                        onChange={(e) => setBabyCotRequest(e.target.value)}
                      />
                    </Col>
                    <Col sm={10}>
                      <Form.Check
                        type="checkbox"
                        label="I want airport transfer"
                        name="AirportTransferRadio"
                        id="AirportTransferRadio"
                        value={true}
                        onChange={(e) => setAirportTransfer(e.target.value)}
                      />
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Any personal request?</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={extraReq}
                    onChange={(e) => setExtraReq(e.target.value)}
                  />
                </Form.Group>
              </Card.Body>
            </Card>
            <Link className="link" to="/payinfo" state={custData}>
              <Button variant="primary" type="submit">
                Proceed to next step
              </Button>
            </Link>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CustomerInformation;
