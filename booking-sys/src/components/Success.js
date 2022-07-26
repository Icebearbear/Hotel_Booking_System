import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

function Success() {
  const navigate = useNavigate();
  const [time, setTime] = useState(3);
  const info = localStorage.getItem("HOTEL_BOOKING_INFO");

  useEffect(() => {
    let interval = setInterval(() => {
      if (time == 3) {
        bookHotel();
        //sendEmailConfirmation();
      }
      setTime(time - 1);
      if (time == 1) {
        clearInterval(interval);
        navigate("/searchhotel");
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [time]);

  const bookHotel = () => {
    const infoObject = JSON.parse(info);

    console.log("sucess page");
    axios
      .post("http://localhost:3001/bookhotel", infoObject)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sendEmailConfirmation = () => {
    const infoObject2 = JSON.parse(info);
    delete infoObject2.supplierBookingID;
    delete infoObject2.supplierBookingRespond;
    delete infoObject2.uid;
    axios
      .post("http://localhost:3001/mail", infoObject2)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container mb-4 p-3 d-flex justify-content-center">
      <Card style={{ width: "50rem", height: "30rem" }}>
        <Card.Body>
          <Alert variant="success" dismissible>
            <Alert.Heading>You have checked out succesfully!</Alert.Heading>
            <p>
              You have succesfully checkout the hotel booking. You can return to
              main page to continue use our service.
            </p>
            <div className="cdown">
              <div className="d-flex justify-content-end">
                <Spinner animation="border" role="status" size="lg">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
                <div class="space"></div>
                <p>{"Back to Search hotel in " + time}</p>
              </div>
            </div>
          </Alert>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Success;
