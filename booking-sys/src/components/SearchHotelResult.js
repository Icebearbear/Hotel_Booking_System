import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
// import Col from "react-bootstrap/Col";

import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";

function SearchHotelResult() {
  const [hotelId, setHotels] = useState("");
  const [HotelDetails, setHotelDetails]=useState([]);
  const [HotelPrices, setHotelPrices]=useState([]);

  const location = useLocation();
  // const searchData = location.state; // get data passed from SearchHotel page

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
  const getHotelDeets = async (hotel_id) =>{
    try {
      await axios.get("http://localhost:3001/hotels", {params : {data: searchData.destination_id}})
      .then((res) => {
        setHotelDetails(res.data);
        console.log(res.data)  // set State
        // setHotels(res.data[0]["id"])

      })
    } catch (err) {
      console.error(err.message);
    }
  }


  const getHotelPrices = async () => {
    try {
      await axios.get("http://localhost:3001/hotelprices", {params : {data: searchData}})
      .then((res) => {
        setHotelPrices(res.data.hotels);
        console.log(res.data.hotels)  // set State
        // setHotels(res.data[0]["id"])

      })
      
    } catch (err) {
      console.error(err.message);
    }
  };
  // const hotelData = null;
  useEffect(() => {
    getHotelPrices();
    getHotelDeets();
  },[])

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3001/hotels", searchData) // pass searchData to backend as HTTP request parameters
  //     .then((hotelres) => {
  //       hotelData = hotelres;
  //       // this is code to get 1 id only. to get all of the data, track back to "hotelres"
  //       setHotels(hotelres.data[0]["id"]); // data from api is in variable "hotelres"
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // });

  // console.log(hotelData);
  function HotelMap(props){
    props.details.map((value, index) =>{
      var display_info = [];
      var hotel = HotelDetails.filter(function(HotelDetails){ if(HotelDetails.id == value.id){return HotelDetails}})
      // console.log(hotel[0])
      return(
        <div>
        <Hoteldisplay details={hotel[0]}/>
        </div>
      )
    })
  }

  return (
    <><div className="d-flex justify-content-around">
      <Card style={{ width: "50rem", height: "30rem" }}>
        <Card.Body>
          <h1>Search Result Page</h1>

          <h4>{"Available hotel id " + hotelId}</h4>
          <Link to="/viewhotel" state={{ hotelId: hotelId }}>
            <Button variant="primary" type="submit" className="float-right">
              Select hotel
            </Button>
          </Link>

        </Card.Body>
      </Card>
    </div><HotelMap details={HotelPrices} /></>
  );
}

function Hoteldisplay(props) {
  return (
    <>
      {props.details.map((value, index) => (
        <div className="d-flex p-2 justify-content-around">
          <Card key={index} className="text-center" style={{ width: "75rem" }}>
            <Card.Header as="h5">{value.name}</Card.Header>
            <div className="d-flex" style={{ flexDirection: "row" }}>
              <Card.Img
                style={{ width: "18rem" }}
                src="https://www.ecowatch.com/wp-content/uploads/2022/04/tree-frog.jpg"
              ></Card.Img>
              <Card.Body>
                <div className="overflow-auto">
                  <Card.Text
                    dangerouslySetInnerHTML={{ __html: value.description }}
                  />
                  <Link to="/viewhotel" state={{ hotelId: value.id }}>
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
      ))}
      ;
    </>
  );
}




// function Hoteldisplay(props){
//   return(
//     <>
//       {props.details.map((value, index)=> (
//         <div className="d-flex p-2 justify-content-around">
//         <Card key = {index} className="text-center" style={{ width: '75rem'}}>
//           <Card.Header as="h5">{value.id}
//           </Card.Header>
//           <div className= "d-flex" style={{flexDirection:'row'}}>
//             <Card.Img style={{ width: '18rem'}} src="https://www.ecowatch.com/wp-content/uploads/2022/04/tree-frog.jpg"></Card.Img>
//             <Card.Body >
//             <div className = "overflow-auto">
//               <Card.Text dangerouslySetInnerHTML={{__html: value.description}}/>
//               <Link to="/viewhotel" state={{hotelId: value.id}}>
//                 <Button variant="primary" type="submit" className="float-right">
//                   Select hotel
//                 </Button>
//               </Link>
//               </div>
//             </Card.Body>
//           </div>
//         </Card>
//         </div>
//       ))};
//     </>
//   )
// }


// function Hoteldisplay(props){
//   return(
//     <>
//       {props.details.map((value, index)=> (
//         <div className = "card" key={index}>
//           <div className="card_body">
//             {/* <img src={value.image_details}/> */}
//             <h1 className="card_title">{value.name}</h1>
//             <p className="card_description" dangerouslySetInnerHTML={{__html: value.description}}/>
//             <Link to="/viewhotel" state={{hotelId: value.id}}>
//                 <Button variant="primary" type="submit" className="float-right">
//                   Select hotel
//                 </Button>
//               </Link>
//           </div>
//         </div>
//       ))};
//     </>
//   )
// }

export default SearchHotelResult;
