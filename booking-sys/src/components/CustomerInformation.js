import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Stack from "react-bootstrap/Stack";
import NavigationBar from "./NavigationBar";
import "../css/user.min.css";
function CustomerInformation() {
  // data from user inputs
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

  const uid = localStorage.getItem("USER_ID"); // get data from localStorage temporarily

  // for input fields validation
  const [validated, setValidated] = useState(false); //for input field validation
  const [noInput, setNoInput] = useState(true);

  /// Booking Information
  const [hotelInfo, setHotelInfo] = useState([]);
  const [noNight, setNight] = useState(2);
  const comPrice = parseInt(hotelInfo.roomRate * noNight);
  useEffect(() => {
    const selectedObj = JSON.parse(localStorage.getItem("BOOKING_DATA")); // data stored from viewhotel
    setHotelInfo(selectedObj);
    setNight(2);
  }, [setNight]);
  /////////

  const checkoutObj = {
    hotelName: hotelInfo.hotelName,
    price: comPrice,
    noNight: noNight,
  };
  const infoObject = {
    destinationID: hotelInfo.destination_id,
    hotelID: hotelInfo.hotelId,
    bookingInfo: {
      noNight: noNight,
      startDate: hotelInfo.checkIn,
      endDate: hotelInfo.checkOut,
      noAdult: hotelInfo.noOfAdults,
      noChildren: hotelInfo.noOfChildren,
      message: "booking for birthday celebration",
      roomType: hotelInfo.roomType,
      bookForSomeone: bookForSomeone,
      smoking: smoking,
      bedType: bed,
      highFloor: highFloor,
      quiteRoom: quiteRoom,
      babyCotReq: babyCotReq,
      airportTransfer: airportTransfer,
      extraReq: extraReq,
    },
    price: comPrice,
    supplierBookingID: "sbID",
    supplierBookingRespond: "sbrID",
    bookingReference: "bref",
    guestInformation: {
      userID: uid,
      salutation: "Ms",
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      country: country,
    },
    payeeInformation: {
      paymentID: "",
      payeeID: uid,
    },
    uid: uid,
  };
  const handleRequest = (idx) => {
    if (idx === 1) {
      setHighRoom(true);
    }
    if (idx === 2) {
      setQuiteRoom(true);
    }
    if (idx === 3) {
      setBabyCotRequest(true);
    }
    if (idx === 4) {
      setAirportTransfer(true);
    }
  };

  const onSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setNoInput(true);
      console.log("stuck");
    } else {
      setNoInput(false);
    }
    setValidated(true);

    if (noInput === false) {
      console.log(infoObject);
      axios
        .post("http://localhost:3001/create-checkout-session", checkoutObj)
        .then((res) => {
          infoObject.payeeInformation.paymentID = res.data.paymentID; // update paymentID from Stripe
          localStorage.setItem(
            "HOTEL_BOOKING_INFO",
            JSON.stringify(infoObject)
          ); // store to local storage within react
          window.open(res.data.url); // serve the checkout page URL returned by Stripe
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div>
      <NavigationBar />
      <Row>
        <Col md={{ span: 6, offset: 1 }}>
          <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
            <Card style={{ width: "40rem", height: "32rem" }}>
              <Card.Body>
                <h1>Customer Information Page</h1>
                <Form noValidate validated={validated}>
                  <Row className="mb-3">
                    <Form.Group as={Col} className="mb-3">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="string"
                        value={firstName}
                        onChange={(e) => setFName(e.target.value)}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {"Please input valid first name"}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="string"
                        value={lastName}
                        onChange={(e) => setLName(e.target.value)}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {"Please input valid last name"}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Double check for typos"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {"Please input valid email address"}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Row className="mb-3">
                    <Form.Group
                      as={Col}
                      className="mb-3"
                      controlId="formBasicPhone"
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
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {"Please input valid country"}
                      </Form.Control.Feedback>
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
                </Form>
              </Card.Body>
            </Card>
          </div>

          <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
            <Card style={{ width: "40rem", height: "36rem" }}>
              <Card.Body>
                <h1>Special Requests</h1>
                <div key={`inline-radio1`} className="mb-3">
                  <p3>Do you have smoking preferences</p3>
                  <br />
                  {[
                    ["Non Smoking", false],
                    ["Smoking", true],
                  ].map((lbl) => (
                    <Form.Check
                      inline
                      label={lbl}
                      name="group1"
                      type="radio"
                      id={`inline-radio-1`}
                      onChange={(e) => setSmoking(lbl[1])}
                    />
                  ))}
                </div>
                <div key={`inline-radio2`} className="mb-3">
                  <p3>Do you hav bed Preferences</p3>
                  <br />
                  {[
                    ["Large Bed", "large"],
                    ["Twin Bed", "twin"],
                  ].map((lbl) => (
                    <Form.Check
                      inline
                      label={lbl[0]}
                      name="group2"
                      type="radio"
                      id={`inline-radio-2`}
                      onChange={(e) => setBed(lbl[1])}
                    />
                  ))}
                </div>
                Anymore requests?
                <Form.Group as={Col} className="mb-3">
                  <Row>
                    {[
                      ["High floor room please", 1],
                      ["Quite room", 2],
                      ["I Want Baby Bot (additional charges may apply)", 3],
                      ["Airport transfer", 4],
                    ].map((lbl) => (
                      <Col sm={20}>
                        <Form.Check
                          type="checkbox"
                          label={lbl[0]}
                          onChange={(e) => handleRequest(lbl[1])}
                        />
                      </Col>
                    ))}
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
          </div>
        </Col>

        <Col md={4}>
          <div className="userPage">
            <div className="container mt-4 mb-4 p-3 d-flex justify-content-right">
              <Card style={{ width: "40rem", height: "35rem" }}>
                <Card.Body>
                  <Stack gap={3}>
                    <h3>Booking Information</h3>
                    <h5>
                      <strong>{hotelInfo.hotelName}</strong>
                    </h5>
                    <></>
                    <h5>
                      <strong>{hotelInfo.roomType}</strong>
                    </h5>
                    <h5>
                      {noNight +
                        " Room    " +
                        hotelInfo.noOfAdults +
                        " Adults, " +
                        hotelInfo.noOfChildren +
                        " Children / Per Room"}{" "}
                    </h5>

                    {[
                      ["Check-in", hotelInfo.checkIn],
                      ["Check-out", hotelInfo.checkOut],
                      [" ", noNight + " Nights"],
                      [
                        "Room rate (" +
                          noNight +
                          " nights, " +
                          hotelInfo.noOfRooms +
                          "room",
                        "SGD " + hotelInfo.roomRate,
                      ],
                    ].map((display) => (
                      <Form.Group as={Col} className="g-4">
                        <Row>
                          <Col sm={5}>
                            <p3>{display[0]}</p3>
                          </Col>
                          <Col sm={5}>
                            <p3>
                              <strong>{display[1]}</strong>
                            </p3>
                          </Col>
                        </Row>
                      </Form.Group>
                    ))}
                    <Form.Group as={Col} className="g-4">
                      <Row>
                        <Col sm={5}>
                          <h5>
                            <strong>Total:</strong>
                          </h5>{" "}
                        </Col>
                        <Col sm={5}>
                          <p3>
                            <strong>{"SGD " + comPrice}</strong>
                          </p3>
                        </Col>
                      </Row>
                    </Form.Group>
                  </Stack>
                </Card.Body>
              </Card>
            </div>
            <div className="float-right">
              <Button
                variant="primary"
                onClick={onSubmit}
                className="float-right"
              >
                Proceed to next step
              </Button>
            </div>
          </div>
        </Col>
      </Row>
      {/* <div onClick={onSubmit} class="d-flex mt-2">
        <button class="btn1 btn-dark">Proceed to Checkout</button>
      </div> */}
    </div>
  );
}

const SpecialRequest = () => {};
export default CustomerInformation;
