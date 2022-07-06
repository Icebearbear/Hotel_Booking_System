import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";

function SearchHotelResult() {
  const [hotelId, setHotels] = useState("");

  const location = useLocation();
  const searchData = location.state; // get data passed from SearchHotel page
  useEffect(() => {
    axios
      .get("http://localhost:3001/hotels", searchData) // pass searchData to backend as HTTP request parameters
      .then((hotelres) => {
        // this is code to get 1 id only. to get all of the data, track back to "hotelres"
        setHotels(hotelres.data[0]["id"]); // data from api is in variable "hotelres"
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <div className="d-flex justify-content-around">
      <Card style={{ width: "50rem", height: "30rem" }}>
        <Card.Body>
          <h1>Search Result Page</h1>

          <h4>{"Available hotel id " + hotelId}</h4>
          <Link to="/viewhotel" state={{ hotelId: hotelId }}>
            <Button variant="primary" type="submit" className="float-right">
              Select hotel
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
}

export default SearchHotelResult;
