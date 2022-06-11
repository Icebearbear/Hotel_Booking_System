import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class PaymentInformation extends React.Component {
  render() {
    return (
      <div className="d-flex justify-content-around">
        <Card style={{ width: "30rem", height: "30rem" }}>
          <Card.Body>
            <Form.Group className="mb-3" controlId="formBasicPaymentMethod">
              <Form.Label>Payment method</Form.Label>
              <Form.Control
                type="text"
                placeholder="Visa/Mastercard"
                readOnly
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCardHolderName">
              <Form.Label>Card holder name</Form.Label>
              <Form.Control type="string" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCardNumber">
              <Form.Label>Credit/debit card number</Form.Label>
              <Form.Control type="string" />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group
                as={Col}
                className="mb-3"
                controlId="formBasicExpDate"
              >
                <Form.Label>Expiry date</Form.Label>
                <Form.Control type="date" />
              </Form.Group>

              <Form.Group as={Col} className="mb-3" controlId="formBasicCvv">
                <Form.Label>CVC/CVV</Form.Label>
                <Form.Control type="int" />
              </Form.Group>
            </Row>

            <Button variant="primary" type="submit">
              Book Now!
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default PaymentInformation;
