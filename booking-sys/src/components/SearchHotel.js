import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import JSONDATA from "../data/destinations.json";
import "./SearchHotel.css";
import {useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
//import SearchIcon from "@material-ui/icons/Search"
// adding calender 
// npm install react-datepicker --save

function SearchHotel() {
  //const [searchTerm, setSearchTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDate2, setSelectedDate2] = useState(null);
  // Destination ID to pass on
  //const [destID, setDestID] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = JSONDATA.filter((value)=>{
      if (value.term == undefined){return null;}
      return value.term.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === ""){
      setSearchTerm([]);
    }else{
      setSearchTerm(newFilter);
    }
  };
  // prompt user these data and pass to SearchHotelResult to search for hotels
  const passData = {
    UID: "Singapore",
    startDate: "startd",
    endDate: "endd",
    fullName: "hotel name",
  };
  const selectDest = (event, term, uid) => {
    setWordEntered(term);
    setSearchTerm([]);
    //setDestID(uid);
    passData['UID'] = uid;
    alert(passData['UID']);
  }
  const selectDateStart = (date) => {
    setSelectedDate(date);
    passData['startd'] = date;
  }
  const selectDateStart2 = (date) => {
    setSelectedDate2(date);
    passData['endd'] = date;
    alert(passData['endd']);
  }

  return (
    <div className="SearchHotel">
      
      <div className="d-flex justify-content-around">
      <Card style={{ width: "100rem", height: "60rem" }}>
        <Card.Body>
          <h1>Search Page</h1>
          <h2>Destination</h2>
          <div className="searchInputs">
            <input type="text" id="field1" placeholder="Search..." value={wordEntered} onChange={handleFilter}/>
          </div>
          {searchTerm.length != 0 && (
          <div className="dataResults">
            {searchTerm.slice(0,10).map((value, key)=>{
              return(
                <p>{value.term}<button onClick={event => selectDest(event, value.term, value.uid)}>  </button></p>
              );
            })}
          </div>
          )}
          <h2>Start Date</h2>
          <div className="datePicker">
            <DatePicker selected={selectedDate} onChange={date => selectDateStart(date)}
            dateFormat='dd/MMM/yy' minDate={new Date()} isClearable showYearDropdown scrollableYearDropdown />
          </div>
          <div className="datePicker">
            <DatePicker selected={selectedDate2} onChange={date => selectDateStart2(date)}
            dateFormat='dd/MMM/yy' minDate={new Date()} isClearable showYearDropdown scrollableYearDropdown />
          </div>

          <Link to="/searchhotelresult" state={passData}>
            <Button variant="primary" type="submit" className="float-right">
              Search hotel
            </Button>
          </Link>

          <Link to="/userprofile">
            <Button variant="primary" type="submit" className="float-right">
              View User Profile
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
      
    </div>
    // <div className="SearchHotel">
    //   <input type="text" placeholder="Search..." onChange={(event) => {setSearchTerm(event.target.value);}}/>
    //   {JSONDATA.filter((val)=>{
    //     if (searchTerm=="") {
    //       return val;
    //     } else if (val.term == undefined){ return null;
    //     } else if (val.term.toLowerCase().includes(searchTerm.toLowerCase())){
    //       return val;
    //     }
    //   }).map((val,key) => {
    //     return (
    //       <div className="term" key={key}>
    //         <p>{val.term}</p>
    //       </div>
    //     );
    //   })}
    // </div>

    //^^
    
    // <div className="d-flex justify-content-around">
    //   <Card style={{ width: "50rem", height: "30rem" }}>
    //     <Card.Body>
    //       <h1>Search Page</h1>

    //       <Link to="/searchhotelresult" state={passData}>
    //         <Button variant="primary" type="submit" className="float-right">
    //           Search hotel
    //         </Button>
    //       </Link>

    //       <Link to="/userprofile">
    //         <Button variant="primary" type="submit" className="float-right">
    //           View User Profile
    //         </Button>
    //       </Link>
    //     </Card.Body>
    //   </Card>
    // </div>
  );
}

export default SearchHotel;
