import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useLocation } from "react-router-dom";
import axios from "axios";
import NavigationBar from "./NavigationBar";

function PaymentInformation() {
  const [holderName, setHolderName] = useState("");
  const [cardNo, setCardNo] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvc, setCVC] = useState("");

  const location = useLocation();
  const data = location.state.datas;
  const hotelId = location.state.hotelId;

  console.log(data);
  console.log(hotelId);
  const cusSubmit = () => {
    const infoObject = {};
    axios
      .post("http://localhost:3001/bookhotel", infoObject)
      .then((res) => {
        // alert(res.status);
        // navigate("/mainpage");
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="d-flex justify-content-around">
      <NavigationBar />
      <Card style={{ width: "30rem", height: "30rem" }}>
        <Card.Body>
          <h1>Payment Information Page</h1>

          <Form.Group className="mb-3" controlId="formBasicPaymentMethod">
            <Form.Label>Payment method</Form.Label>
            <Form.Control type="text" placeholder="Visa/Mastercard" readOnly />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCardHolderName">
            <Form.Label>Card holder name</Form.Label>
            <Form.Control
              type="string"
              value={holderName}
              onChange={(e) => setHolderName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCardNumber">
            <Form.Label>Credit/debit card number</Form.Label>
            <Form.Control
              type="string"
              value={cardNo}
              onChange={(e) => setCardNo(e.target.value)}
            />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} className="mb-3" controlId="formBasicExpDate">
              <Form.Label>Expiry date</Form.Label>
              <Form.Control
                type="date"
                value={expDate}
                onChange={(e) => setExpDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} className="mb-3" controlId="formBasicCvv">
              <Form.Label>CVC/CVV</Form.Label>
              <Form.Control
                type="int"
                value={cvc}
                onChange={(e) => setCVC(e.target.value)}
              />
            </Form.Group>
          </Row>

          <Button onClick={cusSubmit} variant="primary" type="submit">
            Book
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default PaymentInformation;
