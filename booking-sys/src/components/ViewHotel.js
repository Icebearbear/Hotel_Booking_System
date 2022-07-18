import React, {useEffect, useState} from "react";
import Card from "react-bootstrap/Card";
import { Link, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";

const ViewHotel = () => {
  const location = useLocation();
  const { hotelId } = location.state; // get data passed from SearchHotelResult page
  
  //const hotelId = "diH7";
  const [hotelName, setHotelName] = useState("");
  const [rating, setRating] = useState("");

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const getHotelData = () => {
    axios.get("http://localhost:3001/viewhotel", {params: {hotelId: hotelId}}) 
    .then((hotelData) => {
      setHotelName(hotelData.data["name"]);
      setLatitude(hotelData.data["latitude"]);
      setLongitude(hotelData.data["longitude"]);
    })
    .catch((err) => console.log(err.message));
  }

  const getMapData = () => {
    console.log("lat, long: " + latitude, longitude)
  }
    
  useEffect(() => {
    getHotelData();
    });

  // useEffect is the first thing to load when the page is opened
  // useEffect(() => {
  //   const hotelObject = {
  //     id: hotelId
  //   };
  //   axios
  //     .get("http://localhost:3001/viewhotel", hotelObject)
  //     .then((hotelres) => {
  //       var hotelId2 = hotelres.data[0]["id"];
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // });

  return (
    <div className="d-flex justify-content-around">
      <Card style={{ width: "50rem", height: "30rem" }}>
        <Card.Body>
          <h1>View Selected Hotel Page</h1>

          <h4>{"Hotel id: " + hotelId + " is selected"}</h4>
          <h4>{"Hotel name: " + hotelName}</h4>
          <Link className="link" to="/custinfo" state={{ hotelId: hotelId }}>
            <Button variant="primary" type="submit" className="float-right">
              Book hotel
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ViewHotel;
