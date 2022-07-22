import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function BookingHistory() {
  const userID = localStorage.getItem("USER_ID");
  const [bookObj, setBook] = useState([]);
  const [removeBook, setRemove] = useState(false);
  const [selBook, setSelBook] = useState(""); // contains the docId of the selected booking
  useEffect(() => {
    axios
      .get(
        "http://localhost:3001/getBook",
        { params: { uid: userID } },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => {
        console.log("BOOK HISTORY ", res.data.finalData);
        setBook(res.data.finalData);
        return;
      }).catch = (err) => {
      console.log(err);
    };
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
        console.log(err);
      });
  };
  return (
    <div>
      {bookObj.map((value, index) => (
        <div className="container mt-4 mb-4 p-3 d-flex justify-content-around">
          <Card key={index[1]} style={{ width: "50rem", height: "20rem" }}>
            <Card.Body>
              <p>{value[1].uid}</p>
              <h5>
                <strong>{value[1].hotelID}</strong>
              </h5>
              <></>
              <h5>
                <strong>{value[1].bookingInfo.roomType}</strong>
              </h5>
              <h5>
                <strong>
                  {value[1].bookingInfo.startDate +
                    " until " +
                    value[1].bookingInfo.endDate}
                </strong>
              </h5>
              {value[1].bookingInfo.noNight +
                " Room    " +
                value[1].bookingInfo.noAdult +
                " Adults, " +
                value[1].bookingInfo.noChild +
                " Children / Per Room"}{" "}
              <br />
              <Form.Label>{"SGD " + value[1].price}</Form.Label>
              <Form.Group as={Col} className="g-4">
                <Row>
                  <Col sm={2}>
                    <p3>guest: </p3>
                  </Col>
                  <Col sm={5}>
                    <p2>
                      <strong>
                        {value[1].guestInformation.firstName +
                          " " +
                          value[1].guestInformation.lastName}
                      </strong>
                    </p2>
                  </Col>
                </Row>
                <div class="d-flex mt-2">
                  <button
                    onClick={() => onSubmit(value[0])}
                    class="btn1 btn-dark"
                  >
                    Cancel
                  </button>
                </div>
              </Form.Group>
            </Card.Body>
          </Card>{" "}
        </div>
      ))}

      <Modal show={removeBook} onHide={onStop}>
        <Modal.Header closeButton>
          <Modal.Title>Booking Cancellation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {`Are you sure you want to cancel this booking ?`} <br />
          {`Hotel doc id: ${selBook}`}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="info" onClick={onCont}>
            Yes
          </Button>
          <Button variant="warning" onClick={onStop}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default BookingHistory;
