import React, { useRef, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import clsx from "clsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import useLazyLoad from "./useLazyLoad";
import ErrorModal from "./ErrorModal";
import { async } from "@firebase/util";
import { AiFillStar } from "react-icons/ai";
import NavigationBar from "./NavigationBar";
//const Hoteldisplay = lazy(()=> import("./loadHotels"));
//import hotel_placeholder from "../data/hotel_placeholder.png";

function SearchHotelResult() {
  // const [hotelId, setHotels] = useState("");
  const [finalHotels, setFinalHotels] = useState([]);
  const [hotelQ, setHotelQ] = useState(0);
  const [tobequeried, setToQuery] = useState([]);
  const [loaded, setLoaded] = useState(0);
  const [calling, setCalling] = useState(true)
  const [complete, setComplete] = useState(false);
  const [status, setStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  /// for lazy loading
  const NUM_PER_PAGE = 10;
  const TOTAL_PAGES = (hotelQ - finalHotels.length) / NUM_PER_PAGE + 1;
  const triggerRef = useRef(null);
  /////////////////////////////
  var searchData = {};
  // var finalHotels = [];
  var inputed = JSON.parse(localStorage.getItem("SEARCH_DATA"));
  console.log(inputed);
  if (inputed == null) {
    var message =
      "Search details not recorded, please head to Search page and input search";
    return <ErrorModal msg={message} />;
  }
  

  // get data passed from SearchHotel page
  // adjust guest param
  // var no_of_guest = inputed["guests"];
  // var guest_per_room = Math.floor(no_of_guest / inputed["rooms"]);
  // var param_guests = "" + guest_per_room;
  // for (var i = 0; i < inputed["rooms"] - 1; i++) {
  //   param_guests = param_guests + "|" + guest_per_room;
  // }
  searchData["guests"] = inputed["guests"];
  // adjust destination id
  searchData["destination_id"] = inputed["destination_id"];
  // adjust check in check out
  const dateFormat = (string) => {
    var date = new Date(string);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var format = year + "-" + month + "-" + day;
    return format;
  };

  // console.log(dateFormat(inputed["checkin"]));
  searchData["checkin"] = dateFormat(inputed["checkin"]);
  searchData["checkout"] = dateFormat(inputed["checkout"]);
  //}
  const getHotelAndPrices = async () => {
    console.log("called backend")
    await axios
      .get("http://localhost:3001/hotelnprices", {
        params: { data: searchData },
      })
      .then((res) => {
        console.log(res.data.dataLen);
        console.log(res.data.complete);
        setFinalHotels(JSON.parse(res.data.finalData));
        setHotelQ(res.data.dataLen);
        setComplete(res.data.complete)
        setToQuery(JSON.parse(res.data.nulls));
        if (res.data.complete ==false){
          setTimeout(getHotelAndPrices(),400);
        };
        if(res.data.dataLen==0 && res.data.complete ==true){
          setCalling(false);
        }}).catch((errors)=>{
          setStatus(errors.response.status);
          setErrorMsg(errors.response.statusText);
          setCalling(false);
          console.log(errors);
        });
          
  };

  const getnulls = async (value) => {
    console.log(value.id);
    try{
       const hotel = await axios.get("http://localhost:3001/viewhotel", {
        params: { hotelId: value.id },
      }).then(res=>
        JSON.parse(res.data.data))
      .catch((errors)=>{
        setStatus(errors.response.status);
        setErrorMsg(errors.response.statusText);
        console.log(errors);
        return null}); 
      return hotel;
    } catch (err) {
      console.error(err.message);
    }
  };

  const onGrabData = (currentPage, dataloaded) => {
    console.log(currentPage);
    console.log(TOTAL_PAGES);
    if (dataloaded >= hotelQ) {
      return [null, dataloaded];
    }
    if (currentPage == 1) {
      var data = finalHotels;
      setLoaded(finalHotels.length);
      setCalling(false);
      return [data, finalHotels.length]
    }
    const cut = (currentPage - 2) * NUM_PER_PAGE;
    if (currentPage > TOTAL_PAGES) {
      var cut2 = hotelQ - finalHotels.length;
    } else {
      var cut2 = NUM_PER_PAGE * (currentPage - 1);
    }
    setLoaded(finalHotels.length + cut2);
    console.log(finalHotels.length + cut2);
    console.log("VVVVV ", cut, " MMMMMM ", cut2);
    // This would be where you'll call your API
    return new Promise((resolve) => {
      setTimeout(async () => {
        console.log(finalHotels.length);
        var queries = tobequeried.slice(cut, cut2);
        console.log(queries);
        const data = await Promise.all(
          queries.map(async (q) => {
            const res = await getnulls(q);
            return { ...q, ...res };
          })
        );
        console.log("LAZYYYY ", data, data.length);
        resolve([data, finalHotels.length + cut2]);
      }, 100);
    });
  };

  /// updated data from lazy loading
  // console.log("lazyload");
  var ref = triggerRef;
  const { data, loading } = useLazyLoad({ triggerRef, onGrabData });
  console.log(data);
  if (loaded >= hotelQ) {
    ref = null;
  }

  useEffect(() => {
    getHotelAndPrices();
  }, []);

  /// call the diplay cards and display the updated data from lazy loading
  return (
    <>
      <NavigationBar />
      <LoadingPosts hidden={!calling} />
      <div hidden= {!calling} className="d-flex p-2 justify-content-around" id="hotel_results">
        <h3>{"Total Results : " + hotelQ + " Hotels Found"}</h3>
      </div>
        {(complete==true && hotelQ==0)&&<ErrorModal msg={'No results to show, please change search parameters'}/>}
        {(status!= null)&&<ErrorModal msg={`${status} ${errorMsg}: Please head back to search page and select valid parameters`}/>}
      <div className="grid grid-cols-3 gap-4 content-start">
        {data.map((hotels, index) => (
          <HotelDisplay key={index} info={hotels} search={searchData} />
        ))}
      </div>
      <div ref={ref} className={clsx("trigger", { visible: loading })}>
        <LoadingPosts hidden={!loading} />
      </div>
    </>
  );
}

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

const styles = {
  cardImage: {
    maxWidth: "22rem",
    maxHeight: "18rem",
    objectFit: "cover",
    // height: "100%",
  },
};

const LoadingPosts = (props) => {
  return (
    <div className="d-flex p-2 justify-content-around">
      <Spinner hidden={props.hidden} animation="border" role="status" size="lg">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};
/// display cards
function HotelDisplay(props) {
  const info = props.info;
  // console.log(info)
  const navigate = useNavigate();
  return (
    <>
      <div className="d-flex p-2 justify-content-around" id="hotel_card">
        {/* <h3>{"showing hotels at" + props.search['destination_id']}</h3> */}
        <Card
          className="text-center"
          style={{ width: "60rem", height: "fit-content" }}
        >
          <div
            className="d-flex"
            id="hotel_content"
            style={{ flexDirection: "row" }}
          >
            <Card.Img
              style={styles.cardImage}
              src={`${info.image_details.prefix}${info.default_image_index}${info.image_details.suffix}`}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src =
                  "https://instant.space/hotel-placeholder.png";
              }}
            ></Card.Img>
            <Card.Body
              className="card_bodies"
              style={{ width: "20rem", height: "fit-content" }}
            >
              {/* <Card.Body> */}
              {/* <Card.Title>{info.rating + "   stars"}</Card.Title> */}
              {/* {[...Array(5)].map((star, i) => {
                  const ratingValue = i + 1;
                  return (
                    <AiFillStar
                      color={ratingValue > info.rating ? "grey" : "teal"}
                    />
                  );
                })}{" "} */}
              {/* </Card.Body> */}
              {/* <Card.Text>Address : {info.address}</Card.Text> */}

              <Col>
                <Row>
                  <Card.Header as="h3" className="float-left">
                    {info.name}
                  </Card.Header>
                </Row>
                <br />
                <Row>
                  <div style={{ display: "flex" }}>
                    <h5
                      class="text-secondary"
                      className="float-left"
                      style={{ marginRight: "auto" }}
                    >
                      {info.address}
                    </h5>
                  </div>
                  <br />
                </Row>
                <br />

                <Row>
                  <div style={{ display: "flex" }}>
                    {starRating(info.rating)}
                  </div>
                </Row>
              </Col>

              <Col>
                <Row>
                  <div style={{ display: "flex" }}>
                    <h6
                      className="float-right"
                      class="mt-auto me-2"
                      style={{ marginLeft: "auto" }}
                    >
                      SGD
                    </h6>
                    <h3 className="float-right">
                      <strong>{" " + info.price}</strong>
                    </h3>
                  </div>
                </Row>

                <Row>
                  {/* <div style={{ display: "flex" }} class="ca">
                    <Button
                      id="select_hotel"
                      onClick={() => {
                        localStorage.setItem("HOTEL_ID", info.id);
                        try {
                          axios
                            .get("http://localhost:3001/viewhotel", {
                              params: { hotelId: info.id },
                            })
                            .then((hoteldt) => {
                              const hotelData = JSON.parse(hoteldt.data.data);
                              const hotelLocation = {
                                latitude: hotelData["latitude"],
                                longitude: hotelData["longitude"],
                              };
                              console.log("LAT PASSED", hotelLocation.latitude);
                              localStorage.setItem(
                                "HOTEL_LOC",
                                JSON.stringify(hotelLocation)
                              );
                            })
                            .catch((err) => {
                              console.log(err.message);
                            });
                        } catch (err) {
                          console.log(err);
                        }
                        navigate("/viewhotel");
                      }}
                      variant="primary"
                      className="float-right"
                      style={{ marginLeft: "auto" }}
                    >
                      Select hotel
                    </Button> */}
                  {/* </div> */}
                  <div class="d-flex flex-column mt-2">
                    <button
                      id="select_hotel"
                      class="align-self-end btn1 btn-lg btn-block btn-dark mt-auto"
                      onClick={() => {
                        localStorage.setItem("HOTEL_ID", info.id);
                        localStorage.setItem("HotelDetails", info);
                        // try {
                        //   axios
                        //     .get("http://localhost:3001/viewhotel", {
                        //       params: { hotelId: info.id },
                        //     })
                        //     .then((hoteldt) => {
                        //       const hotelData = JSON.parse(hoteldt.data.data);
                        //       const hotelLocation = {
                        //         latitude: hotelData["latitude"],
                        //         longitude: hotelData["longitude"],
                        //       };
                        //       console.log("LAT PASSED", hotelLocation.latitude);
                        //       localStorage.setItem(
                        //         "HOTEL_LOC",
                        //         JSON.stringify(hotelLocation)
                        //       );
                        //     })
                        //     .catch((err) => {
                        //       console.log(err.message);
                        //     });
                        // } catch (err) {
                        //   console.log(err);
                        // }
                        navigate("/viewhotel");
                      }}
                    >
                      Select hotel
                    </button>
                  </div>
                </Row>
              </Col>
            </Card.Body>
          </div>
        </Card>
      </div>
    </>
  );
}

export default SearchHotelResult;
