import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Alert } from "react-bootstrap";
function Cancel() {
  return (
    <div className="d-flex justify-content-around">
      <Card style={{ width: "50rem", height: "30rem" }}>
        <Card.Body>
          <Alert variant="danger" dismissible>
            <Alert.Heading>Oh! You have cancelled the checkout!</Alert.Heading>
            <p>
              The hotel booking is still in your cart. You can checkout again
              another time
            </p>
            <div className="d-flex justify-content-end">
              <Link to="/searchhotel">
                <Button
                  variant="outline-danger"
                  type="submit"
                  className="d-flex justify-content-end"
                >
                  Back to Search hotel
                </Button>
              </Link>
            </div>
          </Alert>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Cancel;
