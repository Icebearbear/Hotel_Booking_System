import React from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import JSONDATA from "../data/destinations.json";
// import "./SearchHotel.css";
import { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation } from "react-router-dom";
import debounce from "lodash/debounce";
import FuzzySearch from "fz-search";

//import SearchIcon from "@material-ui/icons/Search"
// adding calender
// npm install react-datepicker --save

function SearchHotel(props) {
  const navigate = useNavigate();
  // console.log(props.data);
  const [uid, setUid] = useState(null);
  const [searchTerm, setSearchTerm] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDate2, setSelectedDate2] = useState(null);
  const [nrooms, setnrooms] = useState("1");
  const [nadults, setnadults] = useState({0: 1, 1:1, 2:1, 3:1});  
  const [validated, setValidated] = useState(false);
  const [selectedItem, setSelectedItem] = useState(""); //for input field validation
  // Destination ID to pass on
  // const [destID, setDestID] = useState("");
  // if (props.data!=undefined){
  //   setWordEntered(props.data["name"])
  //   setSelectedDate(props.data["checkin"])
  //   setSelectedDate2(props.data["checkout"])
  //   setnrooms(props.data["rooms"])
  //   setnadults(props.data["adults"])
  //   setnchildren(props.data["children"])
  //   setUid(props.data["destination_id"])
  // }

  const debouncedSearch = useRef(
    debounce(async (searcher, searchWord) => {
      const newFilter = searcher.search(searchWord);
      console.log(newFilter);
      if (searchWord === "") {
        setSearchTerm([]);
      } else {
        setSearchTerm(newFilter);
      }
  }, 200)).current;

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const searcher = new FuzzySearch({source: JSONDATA, keys:["term"], token_query_min_length: 0});
    debouncedSearch(searcher, searchWord);};

    const handleClose = props.handle;
    // const newFilter = JSONDATA.filter((value) => {
    //   if (value.term == undefined) {
    //     return null;
    //   }
    //   return value.term.toLowerCase().includes(searchWord.toLowerCase());
    // });
    
  
  // prompt user these data and pass to SearchHotelResult to search for hotels
  const passData = {
    name: wordEntered,
    destination_id: uid,
    checkin: selectedDate,
    checkout: selectedDate2,
    lang: "en_US",
    currency: "SGD",
    rooms: nrooms,
    adults: nadults,
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

  const selectAdults = (key, adult) => {
    // passData['adults'] = adult;
    let updated = {...nadults};
    console.log(updated);
    updated[parseInt(key)] = adult;
    console.log(updated);
    setnadults(updated);
    // setnguests(+nadults + +nchildren);
    // alert(passData['adults']);
  };

  const location = useLocation();
  // console.log(location);
  // console.log(location.pathname);
  
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
    console.log(nadults);
    var param_guests = nadults[0];
    for (var i = 1; i < nrooms; i++) {
      param_guests = param_guests + "|" + nadults[i];
    }
    console.log(param_guests);
    passData["guests"] = param_guests
    console.log("data stored");
    localStorage.setItem("SEARCH_DATA", JSON.stringify(passData));

    if (location.pathname != "/searchhotelresult") {
      navigate("/searchhotelresult");
      if(location.pathname == "/viewhotel"){
        handleClose(); 
      }
    }else{
      window.location.reload();
    }
  };

  return (
    <div className="SearchHotel" data-testid="search-page">
      <div
        className="container mb-4 p-3 d-flex justify-content-around"
        id="form"
      >
        <Card style={{ width: "50rem", height: "30rem" }}>
          <Card.Body>
            <h1>Search Page</h1>
            <Form noValidate validated={validated}>
              <Form.Group className="mb-3" controlId="formBasicDestinations">
                <Form.Label>Destination</Form.Label>
                <Form.Control
                  id="dropdown"
                  data-cy="search destination"
                  data-testid="destination"
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
                      console.log(value.term);
                      return (
                        <Dropdown.Item
                          data-cy = "destination"
                          onClick={(event) =>
                            selectDest(event, value.term, value.uid)
                          }
                        >
                          {value.term}
                        </Dropdown.Item>
                      );
                    })}
                  </Dropdown.Menu>
                </div>
              )}

              {/* <h2>Start Date</h2> */}
              <div className="d-flex justify-content-around">
                <div>
                  <Form.Label>Rooms</Form.Label>
                  <Form.Select
                    data-testid="combobox-rooms"
                    id="rooms"
                    onChange={(e) => selectRooms(e.target.value)}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </Form.Select>
                </div>
                    
                <div>
                  <Form.Label className="d-flex">Guests per Room</Form.Label>
                  {Array(parseInt(nrooms)).fill(true).map((val, i) => {
                    return(
                      <div className="d-flex flex-row">
                        <Form.Text className="d-flex m-1 text-nowrap" size="sm" muted>Room {i+1}:</Form.Text>
                        <Form.Select id="guestperroom" className="d-flex mb-2" key={i} onChange={(e) => selectAdults(i, e.target.value)}>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </Form.Select>
                      </div>
                    )}) 
                  }
                  
                </div>
                {/* <div>
                  <Form.Label>Childs</Form.Label>
                  <Form.Select
                    id="childs"
                    data-testid="combobox-child"
                    onChange={(e) => selectChild(e.target.value)}
                  >
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </Form.Select>
                </div> */}
              </div>
              <div className="d-flex p-2 justify-content-around">
                <div>
                  <Form.Label>Start Date</Form.Label>
                  <DatePicker
                    id="startdate"
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
                    id="enddate"
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
                  id="submit"
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