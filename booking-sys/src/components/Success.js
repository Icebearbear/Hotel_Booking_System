import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
//import { Link } from "react-router-dom";
//import Button from "react-bootstrap/Button";
import axios from "axios";
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
          <h1>Success Page</h1>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Success;
