import React, { useEffect, useState } from "react";
import { Container, Card, CardGroup, Col, Row, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "react-slideshow-image/dist/styles.css";
import ImageSlider from "./ImageSlider";

// import Map from "../MapApp.js";

function ViewHotel(props) {
  const location = useLocation();
  const { hotelId } = location.state; // get data passed from SearchHotelResult page
  //const hotelId = "diH7";

  // get data passed from SearchHotelResult page
  const searchData = {
    hotel_id: hotelId + "/",
    destination_id: "WD0M",
    checkin: "2022-08-01",
    checkout: "2022-08-05",
    lang: "en_US",
    currency: "SGD",
    country_code: "SG",
    guests: "2",  // 1 room 2 guests,  if >1 room eg "3|2" is 3 rooms 2 guest each
    partner_id: "1",
  };

  var searchDataLocal = JSON.parse(localStorage.getItem("SEARCH_DATA"));

  var no_of_guest = +(searchDataLocal['adults']) + (+searchDataLocal['childs']);
  var guest_per_room = Math.floor(no_of_guest/searchDataLocal['rooms']);
  var param_guests = "" + guest_per_room;
  for (var i = 0; i< searchDataLocal['rooms'] -1; i++){
    param_guests =param_guests +"|" + guest_per_room;
  }
  
  searchData['destination_id'] = searchDataLocal['UID'];
  searchData['checkin'] = searchDataLocal['startDate'].slice(0,10);
  searchData['checkout'] = searchDataLocal['endDate'].slice(0,10);
  searchData['guests'] = param_guests;

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

  // const sortByRoomPrices = (rooms) => {
  //   roomsDetails.sort(function (a, b) {
  //     return a.lowest_price - b.lowest_price;
  //   });

  //   for (let i = 0; i < rooms.length; i++) {
  //     console.log(rooms[i]["roomNormalizedDescription"] + " " + rooms[i]["lowest_price"])
  //   }
  // }

  useEffect(() => {
    getHotelData();
    getHotelIdPrices();
    // imageObjConstruction();
  }, [setLongitude, setImageData]);

  const containerStyle = {
    width: "500px",
    height: "280px",
    margin: "0 auto",
  };

  return (
    <>
      {/* <div class="container mt-4 mb-4 p-3 d-flex justify-content-center"> */}
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
        {/* Intro Section */}

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
        <div class="d-flex flex-column justify-content-center align-items-center">
          <Card style={{ width: "70rem", height: "30rem" }}>
            <Card.Body>
              <Card.Title>Hotel Location</Card.Title>
              <Container>
                <div style={{ width: "60rem", height: "20rem" }}>
                  {/* <Map /> */}
                </div>
              </Container>
            </Card.Body>
          </Card>
        </div>

        {/* Rooms */}
        <div class="d-flex flex-column justify-content-center align-items-center">
          {Object.entries(roomsDetails).map(([key, value]) => (
            <Card style={{ width: "70rem", flex: 1 }}>
              <Card.Body>
                <Card.Header>
                  {roomsDetails[key]["roomNormalizedDescription"]}
                </Card.Header>
                <div className="d-flex" style={{ flexDirection: "row" }}>
                  <Card.Img
                    style={{ width: "18rem" }}
                    src={`${roomImg(key)[0]}`}
                  ></Card.Img>
                  <Card.Text>
                    {" Best price is $" + roomsDetails[key]["lowest_price"]}
                  </Card.Text>
                  <Link
                    className="link"
                    to="/custinfo"
                    state={{ hotelId: hotelId }}
                  >
                    <Button
                      variant="primary"
                      type="submit"
                      className="float-right"
                    >
                      Book hotel
                    </Button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>

      <Container>{/* <Map /> */}</Container>
    </>
  );
}

export default ViewHotel;
