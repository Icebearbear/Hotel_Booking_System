import React, { useEffect, useState } from "react";
import { Container, Card, CardGroup, Col, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import ImageSlider from "./ImageSlider";
import Row from "react-bootstrap/Row";
import Map from "./Map";
function ViewHotel(props) {
  const location = useLocation();
  //const { hotelId } = location.state; // get data passed from SearchHotelResult page
  const hotelId = "diH7";

  const [hotelName, setHotelName] = useState("");
  const [address, setAddress] = useState("");
  const [rating, setRating] = useState("");

  const [descr, setDescr] = useState("");
  const [amenities, setAmenities] = useState({});

  const [imageData, setImageData] = useState([]);

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [roomPrices, setRoomPrices] = useState([]);

  const getHotelData = () => {
    try {
      axios
        .get("http://localhost:3001/viewhotel", {
          params: { hotelId: hotelId },
        })
        .then((hoteldt) => {
          const hotelData = JSON.parse(hoteldt.data.data);
          const imgUrl = JSON.parse(hoteldt.data.iurl);
          // console.log(imgUrl);
          setHotelName(hotelData["name"]);
          setAddress(hotelData["address"]);
          setRating(hotelData["rating"]);

          setDescr(hotelData["description"]);
          setAmenities(hotelData["amenities"]);

          setLatitude(hotelData["latitude"]);
          setLongitude(hotelData["longitude"]);
          setImageData(imgUrl);
        })
        .catch((err) => console.log("hoteldata " + err.message));
    } catch (err) {
      console.log(err);
    }
  };

  // const imageObjConstruction = () => {
  //   var imageIndexList = imageIndexes.split(",");
  //   const imageD = [];

  //   imageIndexList.forEach(
  //     (imageI) =>
  //       (imageD[`${imageI}`] =
  //         imageDetails["prefix"] + imageI + imageDetails["suffix"])
  //   );

  //   console.log(imageD);
  //   setImageData(imageD);
  // };

  const checkAmenities = (bool) => {
    if (bool === true) {
      return "Yes";
    }
    return "No";
  };
  // const getRoomsData = () => {
  //   axios.get("http://localhost:3001/hotelprices", {params: {hotelId: hotelId}})
  //   .then((hotelRoomData) => {
  //     setRoomPrices(hotelRoomData.data["rooms"])
  //   })
  //   .catch((err) => console.log("roomdata "+err.message));
  // }

  useEffect(() => {
    getHotelData();
    // imageObjConstruction();
  }, [setLongitude, setImageData]);

  const containerStyle = {
    width: "500px",
    height: "280px",
    margin: "0 auto",
  };

  return (
    <>
      <div class="container mt-4 mb-4 p-3 d-flex justify-content-center">
        <div class="card p-4">
          <div class="image d-flex flex-column justify-content-center">
            <Row>
              <Col>
                <div style={containerStyle}>
                  <ImageSlider slides={imageData} />
                </div>
              </Col>
              <Col>
                <h1 class="card-title">{hotelName}</h1>
                <address>{address}</address>
                <h6>{"Hotel id: " + hotelId}</h6>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <Container maxWidth="lg" className="p-4">
        {/* Intro Section */}

        {/* Hotel description */}
        <div>
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
        </div>

        {/* will integrate to show images */}
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

        {/* Map */}
        <div>
          <Card style={{ flex: 1 }}>
            <Card.Body>
              <Card.Title>Hotel Location</Card.Title>
              {/* <div id="map"></div>
              <script>
                var map = L.map('map').setView([0,0], 1);
                L.tileLayer("https://api.maptiler.com/maps/streets/{0}/{0}/{0}.png?key=xyHVTwBUStmjGg3owyuv", {{attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',}
                }).addTo(map);
                var marker = L.marker([0, 0]).addTo(map);
              </script> */}
            </Card.Body>
          </Card>
        </div>

        {/* <Map /> */}
      </Container>
    </>
  );
}

export default ViewHotel;
