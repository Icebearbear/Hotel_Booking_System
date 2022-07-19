import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function BookingHistory() {
  const userID = localStorage.getItem("USER_ID");
  const [bookObj, setBook] = useState([]);
  const [idObj, setId] = useState([]);
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
        setBook(res.data.finalData);
        setId(res.data.ids);
        // console.log(bookObj);
        return;
      }).catch = (err) => {
      console.log(err);
    };
  }, []);

  const onSubmit = (index) => {
    // console.log("cancel", idObj[id]);
    const docObj = {
      docId: idObj[index].id,
    };
    axios
      .post("http://localhost:3001/deleteBook", docObj)
      .then((res) => {
        if (index > -1) {
          // only splice array when item is found
          setBook(bookObj.splice(index, 1)); // 2nd parameter means remove one item only
          console.log(bookObj);
        }
        console.log("deleted ", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      {/* <RenderCard data={bookObj} details={idObj} /> */}
      {bookObj.map((value, index) => (
        <div className="container mb-4 p-3 d-flex justify-content-around">
          <Card key={index} style={{ width: "50rem", height: "20rem" }}>
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
              <br />
              <Form.Label>{"SGD " + value.price}</Form.Label>
              <Form.Group as={Col} className="g-4">
                <Row>
                  <Col sm={2}>
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
                <div class="d-flex mt-2">
                  <button onClick={() => onSubmit(index)} class="btn1 btn-dark">
                    Cancel
                  </button>
                </div>
              </Form.Group>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default BookingHistory;
