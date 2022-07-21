import React, { useRef, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import clsx from "clsx";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { Component, lazy, Suspense } from "react";
//const Hoteldisplay = lazy(()=> import("./loadHotels"));
import useLazyLoad from "./useLazyLoad";

function SearchHotelResult() {
  const [hotelId, setHotels] = useState("");
  const [finalHotels, setFinalHotels] = useState([]);
  const [hotelQ, setHotelQ] = useState(0);

  /// for lazy loading
  const NUM_PER_PAGE = 10;
  const TOTAL_PAGES = hotelQ / NUM_PER_PAGE;
  const triggerRef = useRef(null);
  /////////////////////////////

  var searchData = {
    destination_id: "WD0M",
    checkin: "2022-07-24",
    checkout: "2022-07-25",
    // lang: "en_US",
    // currency: "SGD",
    // country_code: "SG",
    guests: "2", // 1 room 2 guests,  if >1 room eg "3|2" is 3 rooms 2 guest each
    // partner_id: "1",
  };
  //if (location.state != null){
  var inputed = JSON.parse(localStorage.getItem("SEARCH_DATA")); // get data passed from SearchHotel page
  // adjust guest param
  var no_of_guest = +inputed["adults"] + +inputed["childs"];
  var guest_per_room = Math.floor(no_of_guest / inputed["rooms"]);
  var param_guests = "" + guest_per_room;
  for (var i = 0; i < inputed["rooms"] - 1; i++) {
    param_guests = param_guests + "|" + guest_per_room;
  }
  searchData["guests"] = param_guests;
  // adjust destination id
  searchData["destination_id"] = inputed["UID"];
  // adjust check in check out
  searchData["checkin"] = inputed["startDate"].slice(0, 10);
  searchData["checkout"] = inputed["endDate"].slice(0, 10);

  //}
  const getHotelAndPrices = async () => {
    try {
      await axios
        .get("http://localhost:3001/hotelnprices", {
          params: { data: searchData },
        })
        .then((res) => {
          console.log(res.data.finalData);
          setFinalHotels(JSON.parse(res.data.finalData));
          setHotelQ(res.data.dataLen);
        });
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getHotelAndPrices();
  }, [setFinalHotels, setHotelQ]);

  const onGrabData = (currentPage) => {
    const cut = ((currentPage - 1) % TOTAL_PAGES) * NUM_PER_PAGE;
    const cut2 = NUM_PER_PAGE * (currentPage % TOTAL_PAGES);
    console.log("VVVVV ", cut, " MMMMMM ", cut2);
    // This would be where you'll call your API
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = finalHotels.slice(
          ((currentPage - 1) % TOTAL_PAGES) * NUM_PER_PAGE,
          NUM_PER_PAGE * (currentPage % TOTAL_PAGES)
        );
        console.log("LAZYYYY ", data);
        resolve(data);
      }, 3000);
    });
  };

  /// updated data from lazy loading
  const { data, loading } = useLazyLoad({ triggerRef, onGrabData });

  /// call the diplay cards and display the updated data from lazy loading
  return (
    <>
      <div className="d-flex p-2 justify-content-around">
        <h3>{"showing hotels at " + searchData["destination_id"]}</h3>
      </div>
      <div className="grid grid-cols-3 gap-4 content-start">
        {data.map((hotels, index) => (
          <HotelDisplay
            key={index}
            info={hotels}
            loading={loading}
            search={searchData}
          />
        ))}
      </div>
      <div ref={triggerRef} className={clsx("trigger", { visible: loading })}>
        <LoadingPosts />
      </div>
    </>
  );
}

const LoadingPosts = () => {
  return (
    <div className="d-flex p-2 justify-content-around">
      <Spinner animation="border" role="status" size="lg">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};
/// display cards
function HotelDisplay(props) {
  const info = props.info;
  const navigate = useNavigate();
  return (
    <>
      <div className="d-flex p-2 justify-content-around">
        {/* <h3>{"showing hotels at" + props.search['destination_id']}</h3> */}
        <Card className="text-center" style={{ width: "75rem" }}>
          <Card.Header as="h5">{info.name}</Card.Header>
          <div className="d-flex" style={{ flexDirection: "row" }}>
            <Card.Img
              style={{ width: "18rem" }}
              src={`${info.image_details.prefix}${info.default_image_index}${info.image_details.suffix}`}
            ></Card.Img>
            <Card.Body>
              <h2>
                Price <p>${info.price}</p>
              </h2>
              <h2>Hotel Rating</h2>
              <div className="overflow-auto">
                <Card.Text>{info.rating + "   stars"}</Card.Text>
                <Card.Text>{info.name}</Card.Text>
                <Card.Text>{info.address}</Card.Text>
                <Button
                  onClick={() => {
                    localStorage.setItem("HOTEL_ID", info.id);
                    navigate("/viewhotel");
                  }}
                  variant="primary"
                  className="float-right"
                >
                  Select hotel
                </Button>
              </div>
            </Card.Body>
          </div>
        </Card>
      </div>
    </>
  );
}

export default SearchHotelResult;
