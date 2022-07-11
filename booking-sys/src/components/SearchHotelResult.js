import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
// import Col from "react-bootstrap/Col";

import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";


function SearchHotelResult() {
  const [hotelId, setHotels] = useState("");
  const [HotelDetails, setHotelDetails]=useState([])

  const location = useLocation();
  const searchData = location.state; // get data passed from SearchHotel page

  const getHotelDeets = async () => {
    try {
      const hotelData = await axios.get("http://localhost:3001/hotelprices", searchData)
      setHotelDetails(hotelData.data);  // set State
      setHotels(hotelData.data[0]["id"])
    
    } catch (err) {
      console.error(err.message);
    }
  };
  // const hotelData = null;
  useEffect(() => {
    getHotelDeets()
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
    </div><Hoteldisplay details={HotelDetails} /></>
  );
}


function Hoteldisplay(props){
  return(
    <>
      {props.details.map((value, index)=> (
        <div className="d-flex p-2 justify-content-around">
        <Card key = {index} className="text-center" style={{ width: '75rem'}}>
          <Card.Header as="h5">{value.name}</Card.Header>
          <div className= "d-flex" style={{flexDirection:'row'}}>
            <Card.Img style={{ width: '18rem'}} src="https://www.ecowatch.com/wp-content/uploads/2022/04/tree-frog.jpg"></Card.Img>
            <Card.Body >
            <div className = "overflow-auto">
              <Card.Text dangerouslySetInnerHTML={{__html: value.description}}/>
              <Link to="/viewhotel" state={{hotelId: value.id}}>
                <Button variant="primary" type="submit" className="float-right">
                  Select hotel
                </Button>
              </Link>
              </div>
            </Card.Body>
          </div>
        </Card>
        </div>
      ))};
    </>
  )
}


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
