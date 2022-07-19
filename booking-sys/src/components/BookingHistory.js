import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
function BookingHistory() {
  const userID = localStorage.getItem("USER_ID");
  const [bookObj, setBook] = useState([]);
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
        // console.log(res.data);
        setBook(res.data);
        // console.log(bookObj);
        return;
      }).catch = (err) => {
      console.log(err);
    };
  }, []);

  return (
    <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
      {bookObj.map((value, index) => (
        <Card key={index} style={{ width: "50rem", height: "30rem" }}>
          <Card.Body>
            <p>{value.uid}</p>
            <h5>
              <strong>{value.hotelID}</strong>
            </h5>
            <></>
            <h5>
              <strong>{value.bookingInfo.roomType}</strong>
            </h5>
            <h5>
              <strong>
                {value.bookingInfo.startDate +
                  " until " +
                  value.bookingInfo.endDate}
              </strong>
            </h5>
            {value.bookingInfo.noNight +
              " Room    " +
              value.bookingInfo.noAdult +
              " Adults, " +
              value.bookingInfo.noChild +
              " Children / Per Room"}{" "}
            <h5>value.price</h5>
            <Form.Group as={Col} className="g-4">
              <Row>
                <Col sm={5}>
                  <p3>guest: </p3>
                </Col>
                <Col sm={5}>
                  <p2>
                    <strong>
                      {value.guestInformation.firstName +
                        " " +
                        value.guestInformation.lastName}
                    </strong>
                  </p2>
                </Col>
              </Row>
            </Form.Group>
            {/* <Link to="/searchhotel">
                <Button
                  variant="outline-success"
                  type="submit"
                  className="d-flex justify-content-end"
                >
                  Back to Search hotel
                </Button>
              </Link> */}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default BookingHistory;
