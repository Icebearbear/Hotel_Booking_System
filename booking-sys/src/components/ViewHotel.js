import React, { useEffect, useState } from "react";
import { Container, Card, CardGroup, Col, Row, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import ImageSlider from "./ImageSlider";
import NavigationBar from "./NavigationBar";
// import Map from "../MapApp.js";

function ViewHotel() {
  // get data passed from SearchHotelResult page
  //const hotelId = "diH7";
  const hotelId = localStorage.getItem("HOTEL_ID");

  // get data passed from SearchHotel page
  var searchDataLocal = JSON.parse(localStorage.getItem("SEARCH_DATA"));

  var no_of_guest = +(searchDataLocal['adults']) + (+searchDataLocal['childs']);
  var guest_per_room = Math.floor(no_of_guest / searchDataLocal['rooms']);
  var param_guests = "" + guest_per_room;
  for (var i = 0; i < searchDataLocal['rooms'] - 1; i++) {
    param_guests = param_guests + "|" + guest_per_room;
  }

  const searchData = {
    hotel_id: hotelId,
    destination_id: searchDataLocal['UID'],
    checkin: searchDataLocal['startDate'].slice(0, 10),
    checkout: searchDataLocal['endDate'].slice(0, 10),
    lang: "en_US",
    currency: "SGD",
    country_code: "SG",
    guests: param_guests,  // 1 room 2 guests,  if >1 room eg "3|2" is 3 rooms 2 guest each
    partner_id: "1",
  };

  // hotel info from api
  const [hotelName, setHotelName] = useState("");
  const [address, setAddress] = useState("");
  const [rating, setRating] = useState("");

  const [descr, setDescr] = useState("");
  const [amenities, setAmenities] = useState({});

  const [reviews, setReviews] = useState({});

  const [imageData, setImageData] = useState([]);

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [roomsDetails, setRoomsDetails] = useState({});

  const getHotelData = () => {
    try {
      axios
        .get("http://localhost:3001/viewhotel", {
          params: { hotelId: searchData.hotel_id },
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

          setReviews(hotelData["amenities_ratings"]);

          setLatitude(hotelData["latitude"]);
          setLongitude(hotelData["longitude"]);
          setImageData(imgUrl);
        })
        .catch((err) => console.log("hoteldata " + err.message));
    } catch (err) {
      console.log(err);
    }
  };

  const checkAmenities = (bool) => {
    if (bool === true) {
      return "Yes";
    }
    return "No";
  };

  const getHotelIdPrices = () => {
    axios
      .get("http://localhost:3001/hotelidprices", {
        params: { data: searchData },
      })
      .then((roomData) => {
        setRoomsDetails(roomData.data.rooms);
      })
      .catch((err) => console.log("hotelroomdata " + err.message));
  };

  const roomImg = (roomNo) => {
    var roomImgUrl = roomsDetails[roomNo].images.map(imgurl => imgurl.url)  // array containing room images
    return roomImgUrl;
  }

  function onClick(event, key) {
    const passData = {
      destination_id: searchData["destination_id"],
      hotelId: hotelId,
      hotelName: hotelName,
      roomType: roomsDetails[key].description,
      noOfRooms: searchDataLocal['rooms'],
      noOfAdults: searchDataLocal['adults'],
      noOfChildren: searchDataLocal['childs'],
      checkIn: searchData.checkin,
      checkOut: searchData.checkout,
      roomRate: roomsDetails[key].lowest_price,
      taxRecovery: 0,  // the hotel rooms info don't have this, prob dont show in custinfo?
    }
    console.log(passData);
    localStorage.setItem("BOOKING_DATA", JSON.stringify(passData));
  }

  useEffect(() => {
    getHotelData();
    getHotelIdPrices();
  }, [setLongitude, setImageData]);

  const containerStyle = {
    width: "500px",
    height: "280px",
    margin: "0 auto",
  };

  return (
    <>
      <NavigationBar />
      <div class="image d-flex flex-column justify-content-center align-items-center">
        <Card style={{ width: "70rem", flex: 1 }}>
          <Row>
            <Col>
              <div style={containerStyle}>
                <ImageSlider slides={imageData} />
              </div>
            </Col>
            <Col>
              <h1 class="card-title">{hotelName}</h1>
              <h5>{"Hotel rating: " + rating + "/5 stars"}</h5>
              <address>{address}</address>
              <h6>{"Hotel id: " + hotelId}</h6>
            </Col>
          </Row>
        </Card>
      </div>

      <Container maxWidth="lg" className="p-4">
        {/* Hotel description */}
        <div class="d-flex flex-column justify-content-center align-items-center">
          <CardGroup>
            <div class="d-flex flex-column justify-content-center align-items-center">
              <Card style={{ width: "50rem", flex: 2.5 }}>
                <Card.Body>
                  <Card.Text>
                    <h2>Hotel Overview</h2>
                    <div dangerouslySetInnerHTML={{ __html: descr }} />
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>

            <div class="d-flex flex-column justify-content-center align-items-center">
              <Card style={{ width: "20rem", flex: 1 }}>
                <Card.Body>
                  <h3>Amenities</h3>
                  <Card.Text class="text-justify">
                    {Object.entries(amenities).map(([key, value]) => (
                      <Card.Text>
                        {key + ": " + checkAmenities(value)}
                      </Card.Text>
                    ))}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </CardGroup>
        </div>

        {/* Hotel Reviews */}
        <div class="d-flex flex-column justify-content-center align-items-center">
          <Card style={{ width: "70rem", flex: 1 }}>
            <Card.Body>
              <Card.Title>Hotel Reviews</Card.Title>
              <Card.Text class="text-justify">
                {Object.entries(reviews).map(([key, value]) => (
                  <Card.Text>
                    {reviews[key]["name"] + ": " + reviews[key]["score"]}
                  </Card.Text>
                ))}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>

        {/* Map */}
        {/* <div class="d-flex flex-column justify-content-center align-items-center">
          <Card style={{ width: "70rem", height: "30rem" }}>
            <Card.Body>
              <Card.Title>Hotel Location</Card.Title>
              <Container>
                <div style={{ width: "60rem", height: "20rem" }}>
                  <Map />
                </div>
              </Container>
            </Card.Body>
          </Card>
        </div> */}

        {/* Rooms */}
        <div class="d-flex flex-column justify-content-center align-items-center">
          <Card style={{ width: "70rem", flex: 1 }}>
            <Card.Body>
              <Card.Title>Available Rooms</Card.Title>
            </Card.Body>
          </Card>

          {Object.entries(roomsDetails).map(([key, value]) => (
            <Card className="flex-fill" style={{ height: "20rem", width: "70rem", flexDirection: "row", alignItems: "flex-start" }}>
              <Card.Img style={{ height: "100%", width: "40%", borderRadius: 0 }} src={`${roomImg(key)[0]}`} />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{roomsDetails[key]["roomNormalizedDescription"]}</Card.Title>
                <Card.Text>
                  {`Offered at \$${roomsDetails[key]["lowest_price"]} down from \$${roomsDetails[key]["price"]}!`} <br/>
                  {`*Room surcharges at \$${roomsDetails[key].roomAdditionalInfo.displayFields.surcharges.map(fee => fee.amount)}.`}
                </Card.Text>
                <Link className="link" to="/custinfo">
                  <Button
                    onClick={event => onClick(event, key)}
                    variant="primary"
                    className="float-right"
                  >
                    Book your room
                  </Button>
                </Link>
              </Card.Body>
            </Card>
            // <Card className="flex-fill" style={{ width: "70rem", flexDirection: "row", flex: 1 }}>
            //   <Card.Header className="text-center">
            //     {roomsDetails[key]["roomNormalizedDescription"]}
            //   </Card.Header>
            //   <Card.Img
            //     style={{ width: "30%" }}
            //     src={`${roomImg(key)[0]}`}
            //   ></Card.Img>
            //   <Card.Body>
            //     {/* <div className="d-flex" style={{ flexDirection: "row" }}> */}
            //     <Card.Text>
            //       {" Best price is $" + roomsDetails[key]["lowest_price"]}
            //     </Card.Text>
            //     {/* </div> */}
            //   </Card.Body>
            //   <Card.Footer className="text-center">
            //     <Link
            //       className="link"
            //       to="/custinfo"
            //     >
            //       <Button
            //         onClick={event => onClick(event, key)}
            //         variant="primary"
            //         className="float-right"
            //       >
            //         Book hotel
            //       </Button>
            //     </Link>
            //   </Card.Footer>
            // </Card>
          ))}
        </div>
      </Container>

      <Container>{/* <Map /> */}</Container>
    </>
  );
}

export default ViewHotel;
