import React, {useEffect, useState} from "react";
import Card from "react-bootstrap/Card";
import { Link, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";

function ViewHotel(props) {
  const location = useLocation();
  const { hotelId } = location.state; // get data passed from SearchHotelResult page
  
  //const hotelId = "diH7";
  const [hotelName, setHotelName] = useState("");

  const [imageDetails, setImageDetails] = useState({});
  const [imageIndexes, setImageIndexes] = useState("");
  const imageData = {};

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [roomPrices, setRoomPrices] = useState([]);

  const getHotelData = () => {
    axios.get("http://localhost:3001/viewhotel", {params: {hotelId: hotelId}}) 
    .then((hotelData) => {
      setHotelName(hotelData.data["name"]);

      setImageDetails(hotelData.data["image_details"])
      setImageIndexes(hotelData.data["hires_image_index"])

      setLatitude(hotelData.data["latitude"]);
      setLongitude(hotelData.data["longitude"]);
    })
    .catch((err) => console.log("hoteldata "+err.message));
  }

  const imageObjConstruction = () => {
    var imageIndexList = imageIndexes.split(",");
    imageIndexList.forEach(imageI => 
      imageData[`${imageI}`] = imageDetails["prefix"] + imageI + imageDetails["suffix"]);   
    console.log(imageData);
    }

  const getRoomsData = () => {
    axios.get("http://localhost:3001/hotelprices", {params: {hotelId: hotelId}}) 
    .then((hotelRoomData) => {
      setRoomPrices(hotelRoomData.data["rooms"])
    })
    .catch((err) => console.log("roomdata "+err.message));
  }

  useEffect(() => {
    getHotelData();
    imageObjConstruction();
    getRoomsData();
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
    <div className="d-flex justify-content-around">
      <Card style={{ width: "90rem", height: "30rem" }}>
        <Card.Body>
          <h1>View Selected Hotel Page</h1>

          <h4>{"Hotel id: " + hotelId + " is selected"}</h4>
          <h4>{"Hotel name: " + hotelName}</h4>
          <h4>{"what" + roomPrices[0]}</h4>
          <img src={"https://d2ey9sqrvkqdfs.cloudfront.net/050G/1.jpg"} />
          <Link className="link" to="/custinfo" state={{ hotelId: hotelId }}>
            <Button variant="primary" type="submit" className="float-right">
              Book hotel
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
    <div className='actions'>
      <button className='btn' onClick={imageObjConstruction}>view pic</button>
    </div>
  </>
  );
};


//<toDisplay details={imageData}/>
// function toDisplay(props) {
//   const hotelName = props.hotelName;
//   const imageData = props.imageData;
//   //const map = props.map;
//   return (
//     <>
//       {props.details.map((value, index) => (
//         <div className='relative flex items-center'>
        
//         </div>
//       ))};
      
//         {imageData.props.map((item) => (
//           <img src={item.img} />
//         ))}
      
//     </>
//     );
// }

export default ViewHotel;