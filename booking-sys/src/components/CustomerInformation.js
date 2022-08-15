import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Stack from "react-bootstrap/Stack";
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
} from "react-google-places-autocomplete";
import "../css/user.min.css";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function CustomerInformation() {
  const API_KEY = process.env.REACT_APP_ADDRESS_SEARCH_API_KEY;
  console.log(API_KEY);
  // data from user inputs
  const [firstName, setFName] = useState("");
  const [lastName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [salutation, setSalutation] = useState("");
  const [bookForSomeone, setBookforSomeone] = useState(false);
  const [smoking, setSmoking] = useState("");
  const [bed, setBed] = useState("");
  const [highFloor, setHighRoom] = useState(false);
  const [quiteRoom, setQuiteRoom] = useState(false);
  const [babyCotReq, setBabyCotRequest] = useState(false);
  const [airportTransfer, setAirportTransfer] = useState(false);
  const [extraReq, setExtraReq] = useState("");
  const [success, setSuccess] = useState(false);

  const uid = localStorage.getItem("USER_ID"); // get data from localStorage temporarily

  // for input fields validation
  const [validity, setValidity] = useState(false); //for input field validation
  const [validated, setValidated] = useState(false); //for input field validation
  // const [noInput, setNoInput] = useState(false);

  /// Booking Information
  const [hotelInfo, setHotelInfo] = useState([]);
  const [noNight, setNight] = useState(2);
  const comPrice = parseInt(
    hotelInfo.roomRate * noNight + hotelInfo.surcharges
  );
  ///
  const navigate = useNavigate();
  /// Billing information
  let f_address = {
    street_number: "",
    postal_code: "",
    street: "",
    province: "",
    city: "",
    country: "",
  };
  const [address, setAddress] = useState();
  const [addressObj, setAddressObj] = useState(f_address);
  ////

  useEffect(() => {
    const selectedObj = JSON.parse(localStorage.getItem("BOOKING_DATA")); // data stored from viewhotel
    console.log("BOOKING INFO ", selectedObj);
    setHotelInfo(selectedObj);
    setNight(2);
  }, [setNight]);
  /////////

  const checkoutObj = {
    hotelName: hotelInfo.hotelName,
    price: comPrice,
    noNight: noNight,
    email: email,
  };
  const infoObject = {
    destinationID: hotelInfo.destination_id,
    hotelID: hotelInfo.hotelId,
    hotelName: hotelInfo.hotelName,
    bookingInfo: {
      noNight: noNight,
      startDate: hotelInfo.checkIn,
      endDate: hotelInfo.checkOut,
      noAdult: hotelInfo.noOfGuests,
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
      // billingAddress: Object.assign({ address: address }, addressObj),
    },
    uid: uid,
  };

  const getAddressObject = (address_components) => {
    console.log(address_components);
    const ShouldBeComponent = {
      street_number: ["street_number"],
      postal_code: ["postal_code"],
      street: ["street_address", "route"],
      province: [
        "administrative_area_level_1",
        "administrative_area_level_2",
        "administrative_area_level_3",
        "administrative_area_level_4",
        "administrative_area_level_5",
      ],
      city: [
        "locality",
        "sublocality",
        "sublocality_level_1",
        "sublocality_level_2",
        "sublocality_level_3",
        "sublocality_level_4",
      ],
      country: ["country"],
    };

    let address = {
      street_number: "",
      postal_code: "",
      street: "",
      province: "",
      city: "",
      country: "",
    };

    address_components.forEach((component) => {
      for (var shouldBe in ShouldBeComponent) {
        if (ShouldBeComponent[shouldBe].indexOf(component.types[0]) !== -1) {
          if (shouldBe === "country") {
            address[shouldBe] = component.short_name;
          } else {
            address[shouldBe] = component.long_name;
          }
        }
      }
    });

    // Fix the shape to match our schema
    address.address = address.street_number + " " + address.street;
    delete address.street_number;
    delete address.street;
    if (address.country === "US") {
      address.state = address.province;
      delete address.province;
    }
    return address;
  };

  const handleClose = () => setSuccess(false);

  useEffect(() => {
    const func = async () => {
      const geocodeObj =
        address &&
        address.value &&
        (await geocodeByPlaceId(address.value.place_id));
      const addressObject =
        geocodeObj && getAddressObject(geocodeObj[0].address_components);

      if (
        typeof geocodeObj == "undefined" ||
        typeof geocodeObj == "null" ||
        geocodeObj == null ||
        address == null
      ) {
        setAddressObj(f_address);
      } else {
        setAddressObj(addressObject);
      }
      console.log("addressObject", addressObject);
    };

    func();
  }, [address]);

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
    var noInput = false;
    const custinfo = document.getElementById("customer info");
    const billadd = document.getElementById("billing address");
    if (custinfo.checkValidity() === false|| billadd.checkValidity()===false) {
      event.preventDefault();
      event.stopPropagation();
      noInput = true
      console.log("stuck");
      setValidity(false);
    } else {
      setSuccess(true);
    }
    setValidated(true);
    console.log(noInput);
    
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
          console.log("opened"); 
          setTimeout( navigate("/") ,5000)
        })
        .catch((error) => {
          console.log(error);
        });
    }
    
  };
  return (
    <div data-testid="customer-info-page">
      <Modal
        show = {success}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Payment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Head to Stripe page to make Payment</h4>
        </Modal.Body>
        <Modal.Footer>
          This page will redirect to search page
        </Modal.Footer>
      </Modal>
      <Row>
        <Col md={{ span: 6, offset: 1 }}>
          <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
            <Card style={{ width: "40rem", height: "fit-content" }}>
              <Card.Body>
                <h1>Customer Information Page</h1>
                <Form id= "customer info" validated={validated}>
                  <Row className="mb-3">
                    <Col md={2}>
                      <div>
                        <Form.Label></Form.Label>
                        <Form.Select
                          data-testid="combobox-rooms"
                          id="rooms"
                          onChange={(e) => setSalutation(e.target.value)}
                        >
                          <option value="Mr">Mr</option>
                          <option value="Ms">Ms</option>
                        </Form.Select>
                      </div>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="string"
                          value={firstName}
                          onChange={(e) => setFName(e.target.value)}
                          required
                        />
                        <Form.Control.Feedback
                          type="invalid"
                          role="alert"
                          data-validity={validity}
                          data-testid="fb-fname"
                        >
                          {"Please input valid first name"}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={5}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type="string"
                          value={lastName}
                          onChange={(e) => setLName(e.target.value)}
                          required
                        />
                        <Form.Control.Feedback
                          type="invalid"
                          role="alert"
                          data-validity={validity}
                          data-testid="fb-lname"
                        >
                          {"Please input valid last name"}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
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
                    <Form.Control.Feedback
                      type="invalid"
                      role="alert"
                      data-validity={validity}
                      data-testid="fb-email-ci"
                    >
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
                      <Form.Control.Feedback
                        type="invalid"
                        role="alert"
                        data-validity={validity}
                        data-testid="fb-country"
                      >
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

          {/* BillingAddress */}
          {/* <div className="App"> */}
          <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
            <Card style={{ width: "40rem", height: "fit-content" }}>
              <Card.Body>
                <Form id= "billing address" validated={validated}>
                  <h1>Billing Address</h1>
                  <br />
                  <Form.Label>Address</Form.Label>
                  <GooglePlacesAutocomplete
                    required
                    data-cy="formBillingAddress"
                    apiKey="AIzaSyDJ25yShYJEzncqorEAo0JlESxZZaPF9uo"
                    selectProps={{
                      isClearable: true,
                      value: address,
                      onChange: (val) => {
                        setAddress(val);
                      },
                    }}
                  />
                  <br />
                  <Row className="mb-3">
                    <Col md={4}>
                      <Form.Group className="mb-3" controlId="formBasicCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          controlId="billingAddressCity"
                          type="string"
                          value={addressObj.city}
                          //   onChange={(e) => setCity(e.target.value)}
                          required
                        />
                        <Form.Control.Feedback
                          type="invalid"
                          role="alert"
                          data-validity={validity}
                          data-testid="fb-city"
                        >
                          {"Please search for an address"}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3" controlId="formBasicZip">
                        <Form.Label>Zip/Post code</Form.Label>
                        <Form.Control
                          controlId="billingAddressZip"
                          type="string"
                          value={addressObj.postal_code}
                          // onChange={(e) => setZipcode(e.target.value)}
                          required
                        />
                        <Form.Control.Feedback
                          type="invalid"
                          role="alert"
                          data-validity={validity}
                          data-testid="fb-postalcode"
                        >
                          {"Please search for an address"}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3" controlId="formBasicCountry">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                          controlId="billingAddressCountry"
                          type="string"
                          value={addressObj.country}
                          //   onChange={(e) => setCountryBill(e.target.value)}
                          required
                        />
                        <Form.Control.Feedback
                          type="invalid"
                          role="alert"
                          data-validity={validity}
                          data-testid="fb-country"
                        >
                          {"Please search for an address"}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </div>
          {/* </div> */}
          {/* Special Request */}
          <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
            <Card style={{ width: "40rem", height: "fit-content" }}>
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
                      ["Quiet room", 2],
                      ["I Want Baby Cot (additional charges may apply)", 3],
                      ["Airport transfer", 4],
                    ].map((lbl) => (
                      <Col sm={20}>
                        <Form.Check
                          name="group3"
                          controlId={lbl[0]}
                          type="checkbox"
                          id={`checkbox-2`}
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

        {/* Booking information */}
        <Col md={4}>
          <div className="userPage">
            <div className="container mt-4 mb-4 p-3 d-flex justify-content-right">
              <Card style={{ width: "40rem", height: "fit-content" }}>
                <Card.Body>
                  <Stack gap={3}>
                    <h1>Booking Information</h1>
                    <h4 controlId="hotelname">
                      <strong>{hotelInfo.hotelName}</strong>
                    </h4>
                    <></>
                    <h4 id="roomtype">
                      <strong>{hotelInfo.roomType}</strong>
                    </h4>
                    <h5 id="roominfo">
                      {hotelInfo.noOfRooms +
                        " Rooms " +
                        hotelInfo.noOfGuests +
                        " Guests, "}
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
                          "room)",
                        "SGD " + hotelInfo.roomRate,
                      ],
                      ["Surcharge:", "SGD " + hotelInfo.surcharges],
                    ].map((display) => (
                      <Form.Group as={Col} className="g-4">
                        <Row>
                          <Col md={7}>
                            <h6>{display[0]}</h6>
                          </Col>
                          <Col>
                            <h6>
                              <strong>{display[1]}</strong>
                            </h6>
                          </Col>
                        </Row>
                      </Form.Group>
                    ))}
                    <Form.Group as={Col} className="g-4">
                      <Row>
                        <Col md={7}>
                          <h5>
                            <strong>Total:</strong>
                          </h5>{" "}
                        </Col>
                        <Col>
                          <h5>
                            <strong>{"SGD " + comPrice}</strong>
                          </h5>
                        </Col>
                      </Row>
                    </Form.Group>
                    <div class="d-flex flex-column mt-2">
                      <button
                        class="align-self-end btn1 btn-lg btn-block btn btn-outline-dark mt-auto"
                        onClick={onSubmit}
                      >
                        Proceed to checkout
                      </button>
                    </div>
                  </Stack>
                </Card.Body>
              </Card>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default CustomerInformation;