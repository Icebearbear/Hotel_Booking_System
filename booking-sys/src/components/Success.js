import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Alert } from "react-bootstrap";
function Success() {
  useEffect(() => {
    console.log("sucess page");
    const info = localStorage.getItem("HOTEL_BOOKING_INFO");
    const infoObject = JSON.parse(info);
    axios
      .post("http://localhost:3001/bookhotel", infoObject)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <div className="d-flex justify-content-around">
      <Card style={{ width: "50rem", height: "30rem" }}>
        <Card.Body>
          <Alert variant="success" dismissible>
            <Alert.Heading>You have checked out succesfully!</Alert.Heading>
            <p>
              You have succesfully checkout the hotel booking. You can return to
              main page to continue use our service.
            </p>
            <div className="d-flex justify-content-end">
              <Link to="/searchhotel">
                <Button
                  variant="outline-success"
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

export default Success;
