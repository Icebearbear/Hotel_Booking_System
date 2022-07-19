import React, { useEffect, useState } from "react";
import { Container, Card, CardGroup, Col, Button } from 'react-bootstrap';
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

function ViewHotel() {
  const location = useLocation();
  //const { hotelId } = location.state; // get data passed from SearchHotelResult page
  const hotelId = "diH7";
  //const searchData = location.state; // get data passed from SearchHotel page
  const searchData = {
    hotel_id: hotelId + "/",
    destination_id: "WD0M",
    checkin: "2022-07-20",
    checkout: "2022-07-21",
    // lang: "en_US",
    // currency: "SGD",
    // country_code: "SG",
    // guests: "2",  // 1 room 2 guests,  if >1 room eg "3|2" is 3 rooms 2 guest each
    // partner_id: "1",
  };

  const [hotelName, setHotelName] = useState("");
  const [address, setAddress] = useState("");
  const [rating, setRating] = useState("");

  const [descr, setDescr] = useState("");
  const [amenities, setAmenities] = useState({});

  const [reviews, setReviews] = useState({});

  const [imageDetails, setImageDetails] = useState({});
  const [imageIndexes, setImageIndexes] = useState("");
  const imageData = {};

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [roomsDetails, setRoomsDetails] = useState({});


  const getHotelData = () => {
    axios.get("http://localhost:3001/viewhotel", { params: { hotelId: hotelId } })
      .then((hotelData) => {
        setHotelName(hotelData.data["name"]);
        setAddress(hotelData.data["address"]);
        setRating(hotelData.data["rating"]);

        setDescr(hotelData.data["description"]);
        setAmenities(hotelData.data["amenities"]);

        setReviews(hotelData.data.amenities_ratings);

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
    //console.log(imageData);
  }

  const checkAmenities = (bool) => {
    if (bool === true) {
      return "Yes";
    }
    return "No";
  }

  const getHotelIdPrices = () => {
    axios.get("http://localhost:3001/hotelidprices", { params: { data: searchData } })
      .then((roomData) => {
        setRoomsDetails(roomData.data.rooms);
        console.log("Room: " + roomsDetails[0]["lowest_price"]);
        console.log("No. of rooms: " + roomsDetails.length);

        sortByRoomPrices(roomsDetails);
      })
      .catch((err) => console.log("hotelroomdata " + err.message));
  }

  const sortByRoomPrices = (rooms) => {
    roomsDetails.sort(function (a, b) {
      return a.lowest_price - b.lowest_price;
    });

    for (let i = 0; i < rooms.length; i++) {
      console.log(rooms[i]["roomNormalizedDescription"] + " " + rooms[i]["lowest_price"])
    }
  }

  useEffect(() => {
    getHotelData();
    imageObjConstruction();
    getHotelIdPrices();
    //parseRoomPrices();
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
        <div class="d-flex flex-column justify-content-center align-items-center">
          <Card style={{ width: "70rem", flex: 1 }}>
            <Card.Body>
              <h1>{hotelName}</h1>
              <h5>{"Hotel rating: " + rating + "/5 stars"}</h5>
              <address>{address}</address>
              <h6>{"Hotel id: " + hotelId}</h6>
              <div className="e-card">
                <div className="e-card-image">
                  <Card.Img maxWidth="md" src={"https://d2ey9sqrvkqdfs.cloudfront.net/050G/1.jpg"} />
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>

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
                      <Card.Text>{key + ": " + checkAmenities(value)}</Card.Text>
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
                  <Card.Text>{reviews[key]["name"] + ": " + reviews[key]["score"]}</Card.Text>
                ))}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>

        {/* {/* will integrate to show images */}
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
        <div class="d-flex flex-column justify-content-center align-items-center">
          <Card style={{ width: "70rem", flex: 1 }}>
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

        {/* Rooms */}
        <div class="d-flex flex-column justify-content-center align-items-center">
          {Object.entries(roomsDetails).map(([key, value]) => (
            <Card style={{ width: "70rem", flex: 1 }}>
              <Card.Body>
                <Card.Header>{roomsDetails[key]["roomNormalizedDescription"]}</Card.Header>
                <div className="d-flex" style={{ flexDirection: "row" }}>
                  {/* <Card.Img
                    style={{ width: "18rem" }}
                    src={`${roomsDetails[key]["images"][0]["url"]}}`}
                  ></Card.Img> */}
                  <Card.Text>
                    {roomsDetails[key]["lowest_price"] +" "+ roomsDetails[key].images[0]}
                  </Card.Text>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>

      </Container >
    </>
  );
};

export default ViewHotel;