import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

function Cancel() {
  return (
    <div className="d-flex justify-content-around">
      <Card style={{ width: "50rem", height: "30rem" }}>
        <Card.Body>
          <h1>Cancel Page</h1>
          <p>Your Checkout has been cancelled</p>
          <Link to="/searchhotel">
            <Button variant="primary" type="submit" className="float-right">
              Back to Search hotel
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Cancel;
