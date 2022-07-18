import React, { useEffect, useState } from "react";
// import Card from "react-bootstrap/Card";
// import CardGroup from 'react-bootstrap/CardGroup';
import { Container, Card, CardGroup, Col, Button } from 'react-bootstrap';
import { Link, useLocation } from "react-router-dom";
// import Button from "react-bootstrap/Button";
import axios from "axios";

function ViewHotel(props) {
  const location = useLocation();
  const { hotelId } = location.state; // get data passed from SearchHotelResult page
  //const hotelId = "diH7";

  const [hotelName, setHotelName] = useState("");
  const [address, setAddress] = useState("");
  const [rating, setRating] = useState("");

  const [descr, setDescr] = useState("");
  const [amenities, setAmenities] = useState({});

  const [imageDetails, setImageDetails] = useState({});
  const [imageIndexes, setImageIndexes] = useState("");
  const imageData = {};

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [roomPrices, setRoomPrices] = useState([]);

  const getHotelData = () => {
    axios.get("http://localhost:3001/viewhotel", { params: { hotelId: hotelId } })
      .then((hotelData) => {
        setHotelName(hotelData.data["name"]);
        setAddress(hotelData.data["address"]);
        setRating(hotelData.data["rating"]);

        setDescr(hotelData.data["description"]);
        setAmenities(hotelData.data["amenities"]);

        setImageDetails(hotelData.data["image_details"]);
        setImageIndexes(hotelData.data["hires_image_index"]);

        setLatitude(hotelData.data["latitude"]);
        setLongitude(hotelData.data["longitude"]);
      })
      .catch((err) => console.log("hoteldata " + err.message));
  }

  const imageObjConstruction = () => {
    var imageIndexList = imageIndexes.split(",");
    imageIndexList.forEach(imageI =>
      imageData[`${imageI}`] = imageDetails["prefix"] + imageI + imageDetails["suffix"]);
    console.log(imageData);
  }

  const checkAmenities = (bool) => {
    if (bool === true) {
      return "Yes";
    }
    return "No";
  }
  // const getRoomsData = () => {
  //   axios.get("http://localhost:3001/hotelprices", {params: {hotelId: hotelId}}) 
  //   .then((hotelRoomData) => {
  //     setRoomPrices(hotelRoomData.data["rooms"])
  //   })
  //   .catch((err) => console.log("roomdata "+err.message));
  // }

  useEffect(() => {
    getHotelData();
    imageObjConstruction();
    //getRoomsData();
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
    <>
      <Container maxWidth="lg" className='p-4'>
        {/* Intro Section */}
        <div className="d-flex justify-content-around">
          <Card style={{ flex: 1 }}>
            <Card.Body>
              <h1 class="card-title">{hotelName}</h1>
              <address>{address}</address>
              <h6>{"Hotel id: " + hotelId}</h6>
              <div className="e-card">
                <div className="e-card-image">
                  <Card.Img style={{ flex: 0.5 }} src={"https://d2ey9sqrvkqdfs.cloudfront.net/050G/1.jpg"} />
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>

        {/* Hotel description */}
        <CardGroup>
          <Card style={{ flex: 2 }}>
            <Card.Body>
              <h2>Hotel Overview</h2>
              <Card.Text dangerouslySetInnerHTML={{ __html: descr }} />
            </Card.Body>
          </Card>
          <Card style={{ flex: 1 }}>
            <Card.Body>
              <h3>Amenities</h3>
              <Card.Text class="text-justify">
                {Object.entries(amenities).map(([key, value]) => (
                  <Card.Text>{key + ": " + checkAmenities(value)}</Card.Text>
                ))}
              </Card.Text>
            </Card.Body>
          </Card>
        </CardGroup>

        {/* <div className='actions'>
          <Card style={{ width: "90rem", height: "30rem" }}>
            <Card.Body>
              <Link className="link" to="/custinfo" state={{ hotelId: hotelId }}>
                <Button variant="primary" type="submit" className="float-right">
                  Book hotel
                </Button>
              </Link>
              <button className='btn' onClick={imageObjConstruction}>view pic</button>
            </Card.Body>
          </Card>
        </div> */}

      </Container>
    </>
  );
};


//<toDisplay details={imageData}/>
// function toDisplay(props) {
//   const hotelName = props.hotelName;
//   const imageData = props.imageData;
//   //const map = props.map;
//   return (
//     <>
//       {props.details.map((value, index) => (
//         <div className='relative flex items-center'>

//         </div>
//       ))};

//         {imageData.props.map((item) => (
//           <img src={item.img} />
//         ))}

//     </>
//     );
// }

export default ViewHotel;