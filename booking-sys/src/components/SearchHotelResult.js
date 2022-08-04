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
import CardHeader from "react-bootstrap/CardHeader";
//const Hoteldisplay = lazy(()=> import("./loadHotels"));
//import hotel_placeholder from "../data/hotel_placeholder.png";

function SearchHotelResult() {
  // const [hotelId, setHotels] = useState("");
  const [finalHotels, setFinalHotels] = useState([]);
  const [hotelQ, setHotelQ] = useState(0);
  const [tobequeried, setToQuery]= useState([]);
  const [loaded, setLoaded] = useState(0);

  /// for lazy loading
  const NUM_PER_PAGE = 10;
  const TOTAL_PAGES = ((hotelQ-finalHotels.length) / NUM_PER_PAGE)+1;
  const triggerRef = useRef(null);
  /////////////////////////////

  var searchData = {};
  // var finalHotels = [];
  var inputed = JSON.parse(localStorage.getItem("SEARCH_DATA")); 
  console.log(inputed);
  if(inputed == null){
    var message = "Search details not recorded, please head to Search page and input search"
    return(<ErrorModal msg={message}/>)
  }
  // get data passed from SearchHotel page
  // adjust guest param
  var no_of_guest = inputed["guests"];
  var guest_per_room = Math.floor(no_of_guest / inputed["rooms"]);
  var param_guests = "" + guest_per_room;
  for (var i = 0; i < inputed["rooms"] - 1; i++) {
    param_guests = param_guests + "|" + guest_per_room;
  }
  searchData["guests"] = param_guests;
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
    try {
      await axios
        .get("http://localhost:3001/hotelnprices", {
          params: { data: searchData },
        })
        .then((res) => {
          if(res.data.dataLen == 0){
            console.log(res.data.dataLen)
            getHotelAndPrices();
          }
          else{
          setFinalHotels(JSON.parse(res.data.finalData));
          console.log(JSON.parse(res.data.nulls));
          setHotelQ(res.data.dataLen);
          setToQuery(JSON.parse(res.data.nulls));

          }});
    } catch (err) {
      console.error(err.message);
    }
  };

  const getnulls= async (value) => {
    console.log(value.id);
    try{
       const hotel = await axios.get("http://localhost:3001/viewhotel", {
        params: { hotelId: value.id },
      }).then(res=>
        JSON.parse(res.data.data));
      // console.log(hotel);
      return hotel;
    }catch(err){
      console.error(err.message);
    }
  }

  const onGrabData = (currentPage, dataloaded) => {
    console.log(currentPage)
    console.log(TOTAL_PAGES); 
    if(dataloaded>=hotelQ){
      return [null, dataloaded];
    }
    if(currentPage==1){
      var data = finalHotels
      setLoaded(finalHotels.length);
      return [data, finalHotels.length]
    }
    const cut = (currentPage - 2) * NUM_PER_PAGE;
    if (currentPage>TOTAL_PAGES){
      var cut2 = hotelQ-finalHotels.length;
    }else{
      var cut2 = NUM_PER_PAGE * (currentPage-1);}
    setLoaded(finalHotels.length+cut2)
    console.log(finalHotels.length+cut2);
    console.log("VVVVV ", cut, " MMMMMM ", cut2);
    // This would be where you'll call your API
    return new Promise((resolve) => {
      setTimeout(async () => {
        console.log(finalHotels.length)
        var queries = tobequeried.slice(cut,cut2);
        console.log(queries)
        const data = await Promise.all(queries.map(async (q)=>{ 
          const res = await getnulls(q)
          return {...q,...res}
        }))
        console.log("LAZYYYY ", data, data.length);
        resolve([data, finalHotels.length+cut2]);
      }, 100);
    });
  };

  /// updated data from lazy loading
  // console.log("lazyload");
  var ref = triggerRef
  const { data, loading } = useLazyLoad({triggerRef, onGrabData});
  console.log(data);
  if (loaded>= hotelQ){
    ref=null;
  }

  useEffect(() => {
    getHotelAndPrices();
  },[]);

  /// call the diplay cards and display the updated data from lazy loading
  return (
    <>
      <div className="d-flex p-2 justify-content-around">
        <h3>{"Total Results : " + hotelQ + " Hotels Found"}</h3>
      </div>
      <div className="grid grid-cols-3 gap-4 content-start">
        {data.map((hotels, index) => (
          <HotelDisplay
            key={index}
            info={hotels}
            search={searchData}
          />
        ))}
      </div>
      <div ref={ref} className={clsx("trigger", { visible: loading })}>
        <LoadingPosts hidden={!loading} />
      </div>
    </>
  );
}

const LoadingPosts = (props) => {
  return (
    <div className="d-flex p-2 justify-content-around">
      <Spinner hidden = {props.hidden} animation="border" role="status" size="lg">
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
      <div className="d-flex p-2 justify-content-around">
        {/* <h3>{"showing hotels at" + props.search['destination_id']}</h3> */}
        <Card
          className="text-center"
          style={{ width: "60rem", height: "fit-content" }}
        >
          <Card.Header as="h3">{info.name}</Card.Header>
          <div className="d-flex" style={{ flexDirection: "row" }}>
            <Card.Img
              style={{ maxWidth: "30rem", maxHeight: "20rem" }}
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
              <Card.Header as="h5">Price</Card.Header>
              <Card.Body>
                <Card.Title>${info.price}</Card.Title>
              </Card.Body>
              <Card.Header as="h5">Hotel Rating</Card.Header>
              <Card.Body>
                <Card.Title>{info.rating + "   stars"}</Card.Title>
                {[...Array(5)].map((star, i) => {
                  const ratingValue = i + 1;
                  return (
                    <AiFillStar
                      color={ratingValue > info.rating ? "grey" : "teal"}
                    />
                  );
                })}{" "}
              </Card.Body>
              <Card.Text>Address : {info.address}</Card.Text>
              <Button
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
                          longitude: hotelData["longitude"]
                        }
                        console.log("LAT PASSED", hotelLocation.latitude)
                        localStorage.setItem("HOTEL_LOC", JSON.stringify(hotelLocation));
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
              >
                Select hotel
              </Button>
            </Card.Body>
          </div>
        </Card>
      </div>
    </>
  );
}

export default SearchHotelResult;
