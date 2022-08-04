import React, { useEffect, useState, useRef } from "react";
import {
  Container,
  Card,
  CardGroup,
  Col,
  Row,
  Button,
  ListGroup,
} from "react-bootstrap";
import axios from "axios";
import ImageSlider from "./ImageSlider";
import NavigationBar from "./NavigationBar";

// map imports
import MapOl from "./MapComponents/MapOl";
import "./MapComponents/MapOl.css";
import Layers from "./MapComponents/Layers";
import TileLayer from "./MapComponents/TileLayer";
import VectorLayer from "./MapComponents/VectorLayer";
import osm from "./MapComponents/osm";
import vector from "./MapComponents/vector";
import { fromLonLat, get } from "ol/proj";
import Controls from "./MapComponents/Controls";
import FullScreenControl from "./MapComponents/FullScreenControl";

import { Circle as CircleStyle, Fill, Stroke, Style, Icon } from "ol/style";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
// import MarkerStyle from "./MapComponents/MarkerStyle";

import { Link, Navigate, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";

function ViewHotel() {
  // get data passed from SearchHotelResult page
  const navigate = useNavigate();
  const hotelId = localStorage.getItem("HOTEL_ID");
  const hotelLocation = JSON.parse(localStorage.getItem("HOTEL_LOC"));
  console.log("LAT HOTELPAGE", hotelLocation.latitude);

  // get data passed from SearchHotel page
  var searchDataLocal = JSON.parse(localStorage.getItem("SEARCH_DATA"));
  var no_of_guest = +searchDataLocal["adults"] + +searchDataLocal["childs"];
  var guest_per_room = Math.floor(no_of_guest / searchDataLocal["rooms"]);
  var param_guests = "" + guest_per_room;
  for (var i = 0; i < searchDataLocal["rooms"] - 1; i++) {
    param_guests = param_guests + "|" + guest_per_room;
  }
  const dateFormat = (string) => {
    var date = new Date(string);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var format = year + "-" + month + "-" + day;
    return format;
  };
  const searchData = {
    hotel_id: hotelId,
    destination_id: searchDataLocal["destination_id"],
    checkin: dateFormat(searchDataLocal["checkin"]),
    checkout: dateFormat(searchDataLocal["checkout"]),
    lang: "en_US",
    currency: "SGD",
    country_code: "SG",
    guests: param_guests, // 1 room 2 guests,  if >1 room eg "3|2" is 3 rooms 2 guest each
    partner_id: "1",
  };

  // hotel info from api
  const [hotelName, setHotelName] = useState("");
  const [address, setAddress] = useState("");
  const [rating, setRating] = useState("");

  const [descr, setDescr] = useState("");
  const [amenities, setAmenities] = useState({});

  const [reviews, setReviews] = useState({});

  const [longitude, setLongitude] = useState("");
  const [imageData, setImageData] = useState([]);

  const [roomsDetails, setRoomsDetails] = useState({});
  const [roomFlag, setRoomFlag] = useState("");
  const [CheapestRoomPrice, setCheapestRoomPrice] = useState("");

  const [warning, setWarning] = useState(false);
  const [login, setLogin] = useState("false");

  // FUNCTIONS FOR HOTEL DISPLAY
  const getHotelData = () => {
    try {
      axios
        .get("http://localhost:3001/viewhotel", {
          params: { hotelId: searchData.hotel_id },
        })
        .then((hoteldt) => {
          const hotelData = JSON.parse(hoteldt.data.data);
          const imgUrl = JSON.parse(hoteldt.data.iurl);
          console.log(hotelData);
          console.log(imgUrl);
          // console.log(imgUrl);
          setHotelName(hotelData["name"]);
          setAddress(hotelData["address"]);
          setRating(hotelData["rating"]);

          setDescr(hotelData["description"]);
          setAmenities(hotelData["amenities"]);

          setReviews(hotelData["amenities_ratings"]);

          setCenter([hotelData["longitude"], hotelData["latitude"]]);

          setImageData(imgUrl);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const starRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 10; i++) {
      if (stars.length == 5) {
        break;
      }
      if (i <= rating * 2 && i % 2 == 0) {
        const star = (
          <Card.Img
            style={{ height: "25px", width: "25px" }}
            src={require("./StarRatingParts/yellowstar.png")}
            alt="star png"
          />
        );
        stars.push(star);
      } else if (i % (rating * 2) == 0 && i % 2 == 1) {
        const star = (
          <Card.Img
            style={{ height: "25px", width: "25px" }}
            src={require("./StarRatingParts/halfgreystar.png")}
            alt="star png"
          />
        );
        stars.push(star);
      } else if (i > rating * 2 && i % 2 == 0) {
        const star = (
          <Card.Img
            style={{ height: "25px", width: "25px" }}
            src={require("./StarRatingParts/greystar.png")}
            alt="star png"
          />
        );
        stars.push(star);
      }
    }
    return stars;
  };
  // check if there are amenities data given
  const checkAmenities = () => {
    if (Object.keys(amenities).length === 0) {
      return "No information was provided.";
    }
  };
  // check if there are reviews
  const checkReviews = () => {
    if (reviews.length === 0) {
      return "This hotel does not have any reviews.";
    }
  };
  // convert true into yes and false into no for UI purposes
  const convertAmenities = (bool) => {
    if (bool === true) {
      return (
        <a
          href="https://www.freeiconspng.com/img/14141"
          title="Image from freeiconspng.com"
        >
          <Card.Img
            style={{ height: "20px", width: "20px" }}
            src="https://www.freeiconspng.com/uploads/green-tick-icon-0.png"
            alt="green tick icon"
          />
        </a>
      );
    }
    return (
      <a
        href="https://www.freeiconspng.com/img/4622"
        title="Image from freeiconspng.com"
      >
        <Card.Img
          style={{ height: "20px", width: "20px" }}
          src="https://www.freeiconspng.com/uploads/delete-error-exit-remove-stop-x-cross-icon--28.png"
          alt="red cross icon"
        />
      </a>
    );
  };
  // the given data sucks so this is to make fake reviews
  const convertReviews = (key, score) => {
    if (score >= 65) {
      return ["Very Good", `The ${reviews[key]["name"]} is great!`];
    } else if (score >= 35) {
      return ["Average", `The ${reviews[key]["name"]} is so-so.`];
    } else {
      return ["Bad", `The ${reviews[key]["name"]} sucks.`];
    }
  };

  // MAAAAAAAAAAAAAAAAAPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP
  function addMarkers(lonLatArray) {
    var iconStyle = new Style({
      image: new Icon({
        anchorXUnits: "fraction",
        anchorYUnits: "pixels",
        src: "https://cdn2.iconfinder.com/data/icons/social-media-and-payment/64/-47-32.png",
      }),
    });
    // console.log(lonLatArray);
    let features = lonLatArray.map((item) => {
      let feature = new Feature({
        geometry: new Point(fromLonLat(item)),
      });
      feature.setStyle(iconStyle);
      return feature;
    });
    return features;
  }

  const initMarker = () => {
    if (
      hotelLocation.latitude == "null" ||
      hotelLocation.latitude == "undefined"
    ) {
      return addMarkers([["0.0", "0.0"]]);
    }
    return addMarkers([[hotelLocation.longitude, hotelLocation.latitude]]);
  };

  // long, lat, idk why its the other way round but ok
  const [center, setCenter] = useState(["0.0", "0.0"]);
  const [zoom, setZoom] = useState(12);
  // const initfeat = addMarkers([[hotelLocation.longitude, hotelLocation.latitude]]);
  const initFeat = initMarker();
  // const [features, setFeatures] = useState(addMarkers([["0.0", "0.0"]]));
  const [features, setFeatures] = useState(initFeat);

  // FUNCTIONS FOR ROOMS DISPLAY
  const getHotelIdPrices = () => {
    axios
      .get("http://localhost:3001/hotelidprices", {
        params: { data: searchData },
      })
      .then((roomData) => {
        setRoomFlag(roomData.data.completed);
        console.log("set rooms");
        setRoomsDetails(roomData.data.rooms);
        setCheapestRoomPrice(roomData.data.rooms[0].lowest_converted_price);
      })
      .catch((err) => console.log("hotelroomdata " + err.message));
  };

  const roomImg = (roomNo) => {
    var roomImgUrl = roomsDetails[roomNo].images.map((imgurl) => imgurl.url); // array containing room images
    // console.log("roomimgs"+ roomNo + "   " + typeof roomImgUrl[0])
    if (roomImgUrl[0] == undefined) {
      roomImgUrl = [
        "https://cdn.pixabay.com/photo/2014/08/19/19/39/bedroom-421848_960_720.jpg",
      ]; // set placeholder img
    }
    return roomImgUrl;
  };

  const refresh = () => {
    window.location.reload();
  };

  const onClose = () => {
    setWarning(false);
  };

  const getLogin = () => {
    const lin = localStorage.getItem("LOGIN");
    console.log("linn", lin);
    setLogin(lin);
  };
  function onClick(event, key) {
    getLogin();
    console.log("LOGINNNN ", login);
    if (login == "false") {
      setWarning(true);
      event.preventDefault();
      event.stopPropagation();
    } else {
      setWarning(false);
      goNextPage(event, key);
    }
  }

  // when book hotel button clicked
  function goNextPage(event, key) {
    const surcharge = roomsDetails[
      key
    ].roomAdditionalInfo.displayFields.surcharges.map((fee) => fee.amount);
    const passData = {
      destination_id: searchData["destination_id"],
      hotelId: hotelId,
      hotelName: hotelName,
      roomType: roomsDetails[key].description,
      noOfRooms: searchDataLocal["rooms"],
      noOfAdults: searchDataLocal["adults"],
      noOfChildren: searchDataLocal["childs"],
      checkIn: searchData.checkin,
      checkOut: searchData.checkout,
      roomRate: roomsDetails[key].lowest_price,
      surcharges: surcharge[0],
    };
    console.log(passData);
    localStorage.setItem("BOOKING_DATA", JSON.stringify(passData));
  }

  useEffect(() => {
    getLogin();
    getHotelData();
    getHotelIdPrices();
  }, [setLongitude, setImageData, setLogin]);

  return (
    <>
      {/* Title Card */}
      <div class="image d-flex flex-column justify-content-center align-items-center">
        <Card style={{ width: "70rem", height: "25rem" }}>
          <Row>
            {/* IMAGE SLIDER COL */}
            <Col
            // style={{
            //   backgroundImage:
            //     "url(https://instant.space/hotel-placeholder.png)",
            //   backgroundSize: "90%",
            //   backgroundRepeat: "no-repeat",
            //   backgroundPosition: "center",
            // }}
            >
              <ImageSlider slides={imageData} />
            </Col>
            {/* TEXT COL */}
            <Col>
              <Row>
                <Card.Text>
                  <Row>
                    <h2 class="card-title">{hotelName} </h2>
                  </Row>
                  <Row>
                    <Col>
                      {address} <br />
                      <br /> <br /> <br />
                      <a href="#location">Show on map</a>
                    </Col>
                    <Col style={{ textAlign: "right" }}>
                      {starRating(rating)}
                      <br /> <br /> <br />
                      {reviews.length} reviews <br />
                      <a href="#reviews">View reviews</a>
                    </Col>
                  </Row>
                  <br />
                  <br />
                  <br /> <br />
                  Select a room starting from ${CheapestRoomPrice}
                </Card.Text>
              </Row>
              <div style={{ display: "flex" }}>
                <Button
                  variant="primary"
                  className="float-right"
                  style={{ marginLeft: "auto" }}
                >
                  <a
                    href="#rooms"
                    style={{ color: "white", textDecoration: "none", flex: 1 }}
                  >
                    View room options
                  </a>
                </Button>
              </div>
            </Col>
          </Row>
        </Card>
      </div>

      <Container maxWidth="lg" className="p-4">
        {/* Hotel Description */}
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
                    <Card.Text>{checkAmenities()}</Card.Text>
                    {Object.entries(amenities).map(([key, value]) => (
                      <Card.Text>
                        {key + ": "}
                        {convertAmenities(value)}
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
          <Card id="reviews" style={{ width: "70rem", flex: 1 }}>
            <Card.Body>
              <Card.Title>Hotel Reviews</Card.Title>
              <Card.Text class="text-justify">
                <Card.Text>{checkReviews()}</Card.Text>
                <ListGroup>
                  {Object.entries(reviews).map(([key, value]) => (
                    <Card.Text>
                      <ListGroup.Item>
                        <Row>
                          <Col style={{ flexDirection: "row", flex: 1 }}>
                            Rating:{" "}
                            <b>
                              {" "}
                              {
                                convertReviews(key, reviews[key]["score"])[0]
                              }{" "}
                            </b>{" "}
                            <br />
                            <h5 style={{ color: "green" }}>
                              {" "}
                              {reviews[key]["score"] + "/100"}{" "}
                            </h5>
                          </Col>
                          <Col style={{ flexDirection: "row", flex: 2 }}>
                            {convertReviews(key, reviews[key]["score"])[1]}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    </Card.Text>
                  ))}
                </ListGroup>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>

        {/* Map */}
        <div
          id="reactmap"
          class="d-flex flex-column justify-content-center align-items-center"
        >
          <Card id="location" style={{ width: "70rem", height: "35rem" }}>
            <Card.Body>
              <Card.Title>
                Hotel Location
                <Button
                  onClick={refresh}
                  variant="primary"
                  className="float-right"
                  style={{ marginLeft: "772px" }}
                >
                  View location
                </Button>
              </Card.Title>
              <div>
                <MapOl center={fromLonLat(center)} zoom={zoom}>
                  <Layers>
                    <TileLayer source={osm()} zIndex={0} />
                    <VectorLayer source={vector({ features })} />
                  </Layers>
                  <Controls>
                    <FullScreenControl />
                  </Controls>
                </MapOl>
              </div>
            </Card.Body>
          </Card>
        </div>

        {/* Rooms */}
        <div class="d-flex flex-column justify-content-center align-items-center">
          <Card id="rooms" style={{ width: "70rem", flex: 1 }}>
            <Card.Body>
              <Card.Title>
                Available Rooms
                <Button
                  onClick={refresh}
                  variant="primary"
                  className="float-right"
                  style={{ marginLeft: "768px" }}
                >
                  View rooms
                </Button>
              </Card.Title>
            </Card.Body>
          </Card>

          {Object.entries(roomsDetails).map(([key, value]) => (
            <Card
              className="flex-fill"
              style={{
                height: "23rem",
                width: "70rem",
                flexDirection: "row",
                alignItems: "flex-start",
                flex: 1,
              }}
            >
              <Card.Img
                style={{
                  height: "100%",
                  width: "40%",
                  borderRadius: 0,
                  backgroundImage:
                    "url(https://cdn.pixabay.com/photo/2014/08/19/19/39/bedroom-421848_960_720.jpg)",
                  backgroundSize: "100%",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
                src={`${roomImg(key)[0]}`}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>
                  {roomsDetails[key]["roomNormalizedDescription"]}
                </Card.Title>
                <div
                  class="scrollable"
                  style={{ overflow: "auto", maxHeight: "195px" }}
                >
                  <Card.Text style={{ flex: 1, flexWrap: "wrap" }}>
                    Offered at <b>${roomsDetails[key]["lowest_price"]}</b>, down
                    from ${roomsDetails[key]["price"]}! <br /> <br />
                    <div
                      dangerouslySetInnerHTML={{
                        __html: roomsDetails[key]["long_description"],
                      }}
                    />
                  </Card.Text>
                </div>
                <br />
                <Link className="link" to="/custinfo">
                  <Button
                    onClick={(event) => onClick(event, key)}
                    variant="primary"
                    className="float-right"
                  >
                    Book your room
                  </Button>
                </Link>
                <Card.Text>
                  {" "}
                  *Room surcharges at $
                  {roomsDetails[
                    key
                  ].roomAdditionalInfo.displayFields.surcharges.map(
                    (fee) => fee.amount
                  )}
                  .{" "}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>

      <Modal show={warning} onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login is required</Modal.Title>
        </Modal.Header>
        <Modal.Body>Login is required to book hotel</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Back
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ViewHotel;
