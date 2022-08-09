import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Alert } from "react-bootstrap";

function BookingHistoryc() {
  const userID = localStorage.getItem("USER_ID");
  const [bookObj, setBook] = useState([]);
  const [removeBook, setRemove] = useState(false);
  const [selBook, setSelBook] = useState(""); // contains the docId of the selected booking
  const [empty, setEmpty] = useState(false);

  const getBooking = async () => {
    await axios
      .get(
        "http://localhost:3001/getBook",
        { params: { uid: userID } },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        console.log(res.data.finalData.length);
        console.log("BOOK HISTORY ", response.data);
        setBook(response.data.finalData);
        setEmpty(false);
      })
      .catch((response) => {
        console.log(response.data);
        if (response.data === "Not Found" && response.status == 404) {
          setEmpty(true);
        }
      });
  };
  useEffect(() => {
    getBooking();
    console.log("BOOKKKKK ", bookObj, empty);
  }, [setBook]);

  const onSubmit = (valuePass) => {
    setRemove(true);
    setSelBook(valuePass);
  };

  const onStop = () => {
    setRemove(false);
  };
  const onCont = () => {
    setRemove(false);
    onRemove();
  };
  const onRemove = () => {
    const dId = selBook;
    const docObj = {
      docId: dId,
      userID: userID,
    };
    axios
      .post("http://localhost:3001/deleteBook", docObj)
      .then((res) => {
        setBook(res.data.finalData);
        console.log(" BOOKING HSTORY current data ", res);
      })
      .catch((err) => {
        console.log("errrrr boking hist");
        console.log(err);
      });
  };
  return (
    <div>
      {console.log("BOOKKKKK ", bookObj, empty)}
      {empty == true ? (
        <div className="container mb-4 p-3 d-flex justify-content-center">
          <Alert>
            <Alert.Heading>You have no bookings at this moment</Alert.Heading>
            <p>You can return to main page to continue use our service.</p>
          </Alert>
        </div>
      ) : (
        <div>
          {/* <p>Hotel Bookings</p> */}
          {bookObj.map((value, index) => (
            <div className="container mt-4 mb-4 p-3 d-flex justify-content-around">
              <Card key={index[1]} style={{ width: "50rem", height: "20rem" }}>
                <Card.Body>
                  <h5>
                    <strong data-testid="hotelname">
                      {value[1].hotelName}
                    </strong>
                  </h5>
                  <></>
                  <h5 data-testid="roomtype">
                    <strong>{value[1].bookingInfo.roomType}</strong>
                  </h5>
                  <h5 data-testid="">
                    <strong>
                      {value[1].bookingInfo.startDate +
                        " until " +
                        value[1].bookingInfo.endDate}
                    </strong>
                  </h5>
                  <h6 data-testid="details">
                    {value[1].bookingInfo.noNight +
                      " Room    " +
                      value[1].bookingInfo.noAdult +
                      " Adults, "}
                  </h6>
                  <br />
                  <Form.Label>{"SGD " + value[1].price}</Form.Label>
                  <Form.Group as={Col} className="g-4">
                    <Row>
                      <Col sm={2}>
                        <p>guest: </p>
                      </Col>
                      <Col sm={5}>
                        <p>
                          <strong>
                            {value[1].guestInformation.firstName +
                              " " +
                              value[1].guestInformation.lastName}
                          </strong>
                        </p>
                      </Col>
                    </Row>
                    <div class="d-flex mt-2">
                      <button
                        onClick={() => onSubmit(value[0])}
                        class="btn1 btn-dark"
                        // data-testid={`cancel ${value[1].hotelName}`}
                      >
                        Cancel
                      </button>
                    </div>
                  </Form.Group>
                </Card.Body>
              </Card>{" "}
            </div>
          ))}

          <Modal show={removeBook} onHide={onStop} centered>
            <Modal.Header closeButton>
              <Modal.Title>Booking Cancellation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                {`Are you sure you want to cancel this booking ?`} <br />
                {`Hotel doc id: ${selBook}`}
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={onStop}>
                No
              </Button>
              <Button variant="info" onClick={onCont}>
                Yes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </div>
  );
}

export default BookingHistoryc;