import React from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import JSONDATA from "../data/destinations.json";
// import "./SearchHotel.css";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NavigationBar from "./NavigationBar";
//import SearchIcon from "@material-ui/icons/Search"
// adding calender
// npm install react-datepicker --save

function SearchHotel() {
  //const [searchTerm, setSearchTerm] = useState("");
  const [uid, setUid] = useState(null);
  const [searchTerm, setSearchTerm] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDate2, setSelectedDate2] = useState(null);
  const [nrooms, setnrooms] = useState("1");
  const [nadults, setnadults] = useState("2");
  const [nchildren, setnchildren] = useState("0");
  const [validated, setValidated] = useState(false); //for input field validation
  // Destination ID to pass on
  //const [destID, setDestID] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = JSONDATA.filter((value) => {
      if (value.term == undefined) {
        return null;
      }
      return value.term.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === "") {
      setSearchTerm([]);
    } else {
      setSearchTerm(newFilter);
    }
  };
  // prompt user these data and pass to SearchHotelResult to search for hotels
  const passData = {
    destination_id: uid,
    checkin: selectedDate,
    checkout: selectedDate2,
    lang: "en_US",
    currency: "SGD",
    rooms: nrooms,
    adults: nadults,
    childs: nchildren,
    guests: null,
    partner_id: "1",
  };
  const selectDest = (event, term, uid) => {
    setWordEntered(term);
    setSearchTerm([]);
    //setDestID(uid);
    setUid(uid);
    // alert(uid);
  };
  const selectDateStart = (date) => {
    if (date > selectedDate2 && selectedDate2 !== null) {
      alert("please select a date before the selected end date.");
      return;
    }
    setSelectedDate(date);
    // passData['startDate'] = date;
  };
  const selectDateStart2 = (date) => {
    console.log(typeof date);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    console.log(month);
    var year = date.getFullYear();
    var string = year + "-" + month + "-" + day;
    console.log(string);
    console.log(date);
    setSelectedDate2(date);
    // passData['endDate'] = date;
    // alert(passData['endDate']);
  };

  const selectRooms = (rooms) => {
    setnrooms(rooms);
    // alert(passData['rooms']);
  };

  const selectAdults = (adult) => {
    // passData['adults'] = adult;
    setnadults(adult);
    // setnguests(+nadults + +nchildren);
    console.log(passData);
    // alert(passData['adults']);
  };

  const selectChild = (child) => {
    // passData['childs'] = child;
    setnchildren(child);
    // setnguests(+nadults + +nchildren);
    console.log(passData);
    // alert(passData['childs']);
  };

  const navigate = useNavigate();
  const onSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      console.log("stuck");
    }
    setValidated(true);

    if (passData["destination_id"] == null || passData["checkout"] == null) {
      // alert("empty fields");
      return;
    }

    // console.log(passData['endDate']);
    passData["guests"] = +nadults + +nchildren;
    // console.log(+nadults + +nchildren);
    localStorage.setItem("SEARCH_DATA", JSON.stringify(passData));

    console.log(
      new Date(JSON.parse(localStorage.getItem("SEARCH_DATA")).checkout)
    ); //must pass into new Date object to get back Date format
    // alert(JSON.parse(localStorage.getItem("SEARCH_DATA")).checkout);
    navigate("/searchhotelresult");
  };

  return (
    <div className="SearchHotel" data-testid="search-page">
      <div className="container mb-4 p-3 d-flex justify-content-around">
        <Card style={{ width: "50rem", height: "30rem" }}>
          <Card.Body>
            <h1>Search Page</h1>
            <Form noValidate validated={validated}>
              <Form.Group className="mb-3" controlId="formBasicDestinations">
                <Form.Label>Destination</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Search..."
                  value={wordEntered}
                  onChange={handleFilter}
                  required
                />
              </Form.Group>
              {/* <h2>Destination</h2>
          <div className="searchInputs">
            <input type="text" id="field1" placeholder="Search..." value={wordEntered} onChange={handleFilter}/>
          </div> */}
              {searchTerm.length != 0 && (
                <div className="dataResults">
                  <Dropdown.Menu show>
                    {searchTerm.slice(0, 10).map((value, key) => {
                      return (
                        <Dropdown.Item
                          action
                          onClick={(event) =>
                            selectDest(event, value.term, value.uid)
                          }
                        >
                          {value.term}{" "}
                        </Dropdown.Item>
                      );
                    })}
                  </Dropdown.Menu>
                </div>
              )}

              {/* <h2>Start Date</h2> */}
              <div className="d-flex p-2 justify-content-around">
                <div>
                  <Form.Label>Rooms</Form.Label>
                  <Form.Select
                    data-testid="combobox-rooms"
                    onChange={(e) => selectRooms(e.target.value)}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </Form.Select>
                </div>

                <div>
                  <Form.Label>Adults</Form.Label>
                  <Form.Select
                    data-testid="combobox-adults"
                    onChange={(e) => selectAdults(e.target.value)}
                  >
                    <option value="1">1</option>
                    <option value="2" defaultValue={"2"}>
                      2
                    </option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </Form.Select>
                </div>

                <div>
                  <Form.Label>Childs</Form.Label>
                  <Form.Select
                    data-testid="combobox-child"
                    onChange={(e) => selectChild(e.target.value)}
                  >
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </Form.Select>
                </div>
              </div>
              <div className="d-flex p-2 justify-content-around">
                <div>
                  <Form.Label>Start Date</Form.Label>
                  <DatePicker
                    selected={selectedDate}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => selectDateStart(date)}
                    isClearable
                    showYearDropdown
                    scrollableYearDropdown
                    startDate={selectedDate}
                    endDate={selectedDate2}
                    minDate={new Date()}
                    required
                  />
                </div>

                <div>
                  <Form.Label>End Date</Form.Label>
                  <DatePicker
                    selected={selectedDate2}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => selectDateStart2(date)}
                    isClearable
                    showYearDropdown
                    scrollableYearDropdown
                    startDate={selectedDate}
                    endDate={selectedDate2}
                    minDate={selectedDate}
                    required
                  />
                </div>
              </div>
              {/* <div className="datePicker">
            <DatePicker selected={selectedDate} onChange={date => selectDateStart(date)}
            dateFormat='dd/MMM/yy' minDate={new Date()} isClearable showYearDropdown scrollableYearDropdown />
          </div>
          <div className="datePicker">
            <DatePicker selected={selectedDate2} onChange={date => selectDateStart2(date)}
            dateFormat='dd/MMM/yy' minDate={new Date()} isClearable showYearDropdown scrollableYearDropdown />
          </div> */}
              <div>
                <Button
                  onClick={onSubmit}
                  variant="primary"
                  className="float-right"
                >
                  Search hotel
                </Button>
              </div>
              {/* <Link to="/userprofile">
            <Button variant="primary" type="submit" className="float-right">
              View User Profile
            </Button>
          </Link> */}
            </Form>
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
