import React, { useEffect, useState, useRef } from "react";
import {
  Container,
  Card,
  CardGroup,
  Col,
  Row,
  Button,
  ListGroup,
  OverlayTrigger,
  Popover,
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
  const [hotelId, setHotelId] = useState(localStorage.getItem("HOTEL_ID"));
  const [hotelData, setHotelData] = useState(
    JSON.parse(localStorage.getItem("HOTEL_DETAILS"))
  );
  const [roomsDetails, setRoomsDetails] = useState({});
  const [CheapestRoomPrice, setCheapestRoomPrice] = useState("");
  const [warning, setWarning] = useState(false);
  const [login, setLogin] = useState("false");
  // get data passed from SearchHotelResult page
  const navigate = useNavigate();

  // get data passed from SearchHotel page
  var searchDataLocal = JSON.parse(localStorage.getItem("SEARCH_DATA"));

  const dateFormat = (string) => {
    var date = new Date(string);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var format = year + "-" + month + "-" + day;
    return format;
  };

  var searchData = {
    hotel_id: hotelId,
    destination_id: searchDataLocal["destination_id"],
    checkin: dateFormat(searchDataLocal["checkin"]),
    checkout: dateFormat(searchDataLocal["checkout"]),
    lang: "en_US",
    currency: "SGD",
    country_code: "SG",
    rooms: searchDataLocal["rooms"],
    guests: searchDataLocal["guests"], // 1 room 2 guests,  if >1 room eg "3|2" is 3 rooms 2 guest each
    partner_id: "1",
  };

  // FUNCTIONS FOR HOTEL DISPLAY
  const getHotelData = () => {
    const hotelData = JSON.parse(localStorage.getItem("HOTEL_DETAILS"));
    console.log(hotelData);
    setCenter([hotelData.longitude, hotelData.latitude]);
    setHotelData(hotelData);
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
    if (Object.keys(hotelData.amenities).length === 0) {
      return "No information was provided.";
    }
  };
  // check if there are reviews
  const checkReviews = () => {
    if (hotelData.amenities_ratings.length === 0) {
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
      return [
        "Very Good",
        `The ${hotelData.amenities_ratings[key]["name"]} is great!`,
      ];
    } else if (score >= 35) {
      return [
        "Average",
        `The ${hotelData.amenities_ratings[key]["name"]} is so-so.`,
      ];
    } else {
      return ["Bad", `The ${hotelData.amenities_ratings[key]["name"]} sucks.`];
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

  const [center, setCenter] = useState(["0.0", "0.0"]);
  const [zoom, setZoom] = useState(12);

  const initMarker = () => {
    if (hotelData.latitude === null || hotelData.latitude === undefined) {
      return addMarkers([["0.0", "0.0"]]);
    }
    return addMarkers([[hotelData.longitude, hotelData.latitude]]);
  };

  // long, lat, idk why its the other way round but ok
  const initFeat = initMarker();
  const [features, setFeatures] = useState(initFeat);

  // FUNCTIONS FOR ROOMS DISPLAY
  const getHotelIdPrices = async () => {
    await axios
      .get("http://localhost:3001/hotelidprices", {
        params: { data: searchData },
      })
      .then((roomData) => {
        console.log(roomData.data.completed);
        if (roomData.data.completed == false) {
          console.log("set rooms: ", roomData.data.completed);
          setTimeout(getHotelIdPrices(), 700);
        } else {
          console.log("set rooms: ", roomData.data.completed);
          setRoomsDetails(roomData.data.rooms);
          setCheapestRoomPrice(roomData.data.rooms[0].lowest_converted_price);
        }
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
      hotelName: hotelData.name,
      roomType: roomsDetails[key].description,
      noOfRooms: searchData.rooms,
      checkIn: searchData.checkin,
      checkOut: searchData.checkout,
      roomRate: roomsDetails[key].lowest_converted_price,
      surcharges: surcharge[0],
      noOfGuests: searchData.guests,
    };
    console.log(passData);
    localStorage.setItem("BOOKING_DATA", JSON.stringify(passData));
    navigate("/custinfo");
  }

  useEffect(() => {
    getLogin();
    getHotelData();
    getHotelIdPrices();
  }, []);

  return (
    <>
      {/* Title Card */}
      <NavigationBar />
      <div
        class="image d-flex flex-column justify-content-center align-items-center p-4"
        data-testid="view-hotel-page"
      >
        <Card className="p-3" style={{ width: "70rem", height: "fit-content" }}>
          <Row>
            {/* IMAGE SLIDER COL */}
            <Col
              style={{
                backgroundImage:
                  "url(https://instant.space/hotel-placeholder.png)",
                backgroundSize: "90%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            >
              <ImageSlider slides={hotelData.imgUrl} />
            </Col>
            {/* TEXT COL */}
            <Col>
              <Row>
                <Card.Text className="m-3">
                  <Row>
                    <Col>
                      <h4 class="card-title">
                        <strong>{hotelData.name} </strong>
                      </h4>
                    </Col>
                    <Col className="m-3" style={{ textAlign: "right" }}>
                      {starRating(hotelData.rating)}
                    </Col>
                  </Row>
                  <Row>
                    <Col md={8}>
                      <h5 class="text-muted">{hotelData.address}</h5> <br />
                      <br />
                      <a href="#location">
                        <h5>Show on map</h5>
                      </a>
                    </Col>
                    <Col className="m-3" style={{ textAlign: "right" }}>
                      <br /> <br />
                      <h5>{hotelData.amenities_ratings.length} reviews </h5>
                      <a href="#reviews">
                        <h5>View reviews</h5>
                      </a>
                    </Col>
                  </Row>
                  <br />
                  {/* <br /> <br /> */}
                  {/* Select a room starting from ${CheapestRoomPrice}. */}
                </Card.Text>
              </Row>
              <div className="m-3" style={{ display: "flex" }}>
                <h6
                  className="float-left"
                  class="mt-auto me-2"
                  style={{ marginRight: "auto" }}
                >
                  Select a room starting from
                </h6>
                <h6
                  className="float-right"
                  class="mt-auto me-2"
                  style={{ marginLeft: "auto" }}
                >
                  SGD
                </h6>
                <h3 className="float-right">
                  <strong>{" " + CheapestRoomPrice}</strong>
                </h3>
              </div>
              <div class="d-flex flex-column mt-2">
                <button class="align-self-end btn1 btn-md btn-block btn btn-dark mt-auto">
                  <a
                    href="#rooms"
                    style={{ color: "white", textDecoration: "none", flex: 1 }}
                  >
                    View room options
                  </a>{" "}
                </button>
              </div>
            </Col>
          </Row>
        </Card>
      </div>
      <Container class="d-flex justify-content-center" className="p-4" fluid>
        {/* Hotel Description */}
        <div class="d-flex flex-column justify-content-center align-items-center">
          <CardGroup>
            <div class="d-flex flex-column justify-content-center align-items-center">
              <Card style={{ width: "50rem", flex: 2.5 }}>
                <Card.Body>
                  <Card.Text>
                    <h3>
                      <strong>Hotel Overview</strong>
                    </h3>
                    <div dangerouslySetInnerHTML={{ __html: hotelData.description }} />
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>

            <div class="d-flex flex-column justify-content-center align-items-center">
              <Card style={{ width: "20rem", flex: 1 }}>
                <Card.Body>
                  <h3>
                    <strong>Amenities</strong>
                  </h3>
                  <Card.Text class="text-justify">
                    <Card.Text>{checkAmenities()}</Card.Text>
                    {Object.entries(hotelData.amenities).map(([key, value]) => (
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
              <h3>
                <strong>Hotel Reviews</strong>
              </h3>
              <Card.Text class="text-justify">
                <Card.Text>{checkReviews()}</Card.Text>
                <ListGroup>
                  {Object.entries(hotelData.amenities_ratings).map(
                    ([key, value]) => (
                      <Card.Text>
                        <ListGroup.Item>
                          <Row>
                            <Col style={{ flexDirection: "row", flex: 1 }}>
                              Rating:{" "}
                              <b>
                                {" "}
                                {
                                  convertReviews(
                                    key,
                                    hotelData.amenities_ratings[key]["score"]
                                  )[0]
                                }{" "}
                              </b>{" "}
                              <br />
                              <h5 style={{ color: "green" }}>
                                {" "}
                                {hotelData.amenities_ratings[key]["score"] +
                                  "/100"}{" "}
                              </h5>
                            </Col>
                            <Col style={{ flexDirection: "row", flex: 2 }}>
                              {
                                convertReviews(
                                  key,
                                  hotelData.amenities_ratings[key]["score"]
                                )[1]
                              }
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      </Card.Text>
                    )
                  )}
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
              <h3>
                <strong>Hotel Location</strong>
              </h3>

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
              <Row>
                <Col>
                  <h3>
                    <strong>Available Rooms</strong>
                  </h3>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {Object.entries(roomsDetails).map(([key, value]) => (
            <Card
              className="flex-fill"
              style={{
                height: "20rem",
                width: "70rem",
                flexDirection: "row",
                alignItems: "flex-start",
                // flex: 1,
              }}
            >
              <Card.Img
                style={{
                  height: "100%",
                  width: "35%",
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
                <h4>
                  <strong>
                    {roomsDetails[key]["roomNormalizedDescription"]}
                  </strong>
                  <br />
                </h4>
                <Row>
                  <Col md={7}>
                    <OverlayTrigger
                      trigger="click"
                      key="bottom"
                      placement="bottom"
                      rootClose={true}
                      overlay={
                        <Popover style={{ maxWidth: 700 }} id={`popover-positioned-bottom`}>
                          <Popover.Header as="h3">Room details</Popover.Header>
                          <Popover.Body>
                            <div
                              class="scrollable"
                              style={{ overflow: "auto", maxHeight: "220px" }}
                            >
                              <Card.Text style={{ flex: 1, flexWrap: "wrap" }}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      roomsDetails[key]["long_description"],
                                  }}
                                />
                              </Card.Text>
                            </div>{" "}
                          </Popover.Body>
                        </Popover>
                      }
                    >
                      <Button variant="light">Show Room Details</Button>
                    </OverlayTrigger>
                  </Col>

                  <Col>
                    <Row>
                      <div className="float-right" style={{ display: "flex" }}>
                        <h8 class="mt-auto me-2" style={{ marginLeft: "auto" }}>
                          SGD
                        </h8>
                        <h4>
                          <strong>
                            {roomsDetails[key]["lowest_converted_price"]}
                          </strong>
                        </h4>
                      </div>
                    </Row>

                    <Row>
                      {/* <Link className="link" to="/custinfo"> */}
                      <div class="d-flex flex-column mt-2">
                        <button
                          class="align-self-end btn1 btn-md btn-block btn btn-outline-dark mt-auto"
                          onClick={(event) => onClick(event, key)}
                        >
                          Book Hotel
                        </button>
                      </div>
                      {/* </Link> */}
                    </Row>
                    <Row>
                      {/* <Card.Text> */}
                      <div style={{ display: "flex" }}>
                        <h6
                          className="float-right"
                          class="mt-auto me-2"
                          style={{ marginLeft: "auto" }}
                        >
                          *surcharged at $
                          {roomsDetails[
                            key
                          ].roomAdditionalInfo.displayFields.surcharges.map(
                            (fee) => fee.amount
                          )}{" "}
                        </h6>
                      </div>
                    </Row>
                  </Col>
                </Row>
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
