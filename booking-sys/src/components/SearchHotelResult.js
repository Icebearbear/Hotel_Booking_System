import React, { useRef, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import clsx from "clsx";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { Component, lazy, Suspense } from "react";
//const Hoteldisplay = lazy(()=> import("./loadHotels"));
import useLazyLoad from "./useLazyLoad";

function SearchHotelResult() {
  const [hotelId, setHotels] = useState("");
  const [finalHotels, setFinalHotels] = useState([]);
  const [hotelQ, setHotelQ] = useState(0);
  const location = useLocation();
  // const searchData = location.state; // get data passed from SearchHotel page

  /// for lazy loading
  const NUM_PER_PAGE = 6;
  const TOTAL_PAGES = hotelQ / NUM_PER_PAGE;
  const triggerRef = useRef(null);
  /////////////////////////////

  const searchData = {
    destination_id: "WD0M",
    checkin: "2022-07-20",
    checkout: "2022-07-21",
    // lang: "en_US",
    // currency: "SGD",
    // country_code: "SG",
    // guests: "2",  // 1 room 2 guests,  if >1 room eg "3|2" is 3 rooms 2 guest each
    // partner_id: "1",
  };

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
      <div className="grid grid-cols-3 gap-4 content-start">
        {data.map((hotels, index) => (
          <HotelDisplay key={index} info={hotels} loading={loading} />
        ))}
      </div>
      <div ref={triggerRef} className={clsx("trigger", { visible: loading })}>
        <LoadingPosts />
      </div>
    </>
  );
}

const LoadingPosts = () => {
  return <h1>LOADINGGGG..............</h1>;
};
/// display cards
function HotelDisplay(props) {
  const info = props.info;
  return (
    <>
      <div className="d-flex p-2 justify-content-around">
        {/* <h3>{"LALAAL" + info.id}</h3> */}
        <Card className="text-center" style={{ width: "75rem" }}>
          <Card.Header as="h5">{info.lowest_price}</Card.Header>
          <div className="d-flex" style={{ flexDirection: "row" }}>
            <Card.Img
              style={{ width: "18rem" }}
              src={`${info.image_details.prefix}${info.default_image_index}${info.image_details.suffix}`}
            ></Card.Img>
            <Card.Body>
              <h2>Price</h2>
              <p>{info.price}</p>
              <p>{info.rating}</p>
              <div className="overflow-auto">
                <Card.Text>{info.rating + "   stars"}</Card.Text>
                <Card.Text>{info.name}</Card.Text>
                <Link to="/viewhotel" state={{ hotelId: info.id }}>
                  <Button
                    variant="primary"
                    type="submit"
                    className="float-right"
                  >
                    Select hotel
                  </Button>
                </Link>
              </div>
            </Card.Body>
          </div>
        </Card>
      </div>
    </>
  );
}

export default SearchHotelResult;
