import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button, Container } from "react-bootstrap";
import axios from "axios";
import { useLocation } from "react-router-dom";
import SearchHotel from "./SearchHotel";
import Modal from 'react-bootstrap/Modal';


const NavigationBar = () => {
  const [login, setLogin] = useState(false);
  const [uid, setUid] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();
  const [searchData, setSearchData] = useState({});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const checkpath = ()=>{
    console.log(location.pathname);
    if (location.pathname == "/searchhotelresult" || location.pathname == "/viewhotel"){
      setShowSearch(true);
    }else{
      setShowSearch(false);
    }
  }


  function getSearchData(){
    var data = {};
    var inputed = JSON.parse(localStorage.getItem("SEARCH_DATA"));

    if (inputed == null){
        return
    }

    const dateFormat = (string) => {
        var date = new Date(string);
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        var format = year + "-" + month + "-" + day;
        return format;
      };

    data["guests"] = inputed["guests"];
    data["name"] = inputed["name"];
    data["checkin"] = dateFormat(inputed["checkin"]);
    data["checkout"] = dateFormat(inputed["checkout"]);
    console.log(data)
    setSearchData(data)
  };

  

  const getUser = async () => {
    try {
      await axios.get("http://localhost:3001/getSession").then((res) => {
        setLogin(res.data.login);
        console.log("navaaaaa", res.data.login);
        if (login == true) {
          localStorage.setItem("LOGIN", true); // read by other pages to handle user session
        } else {
          localStorage.setItem("LOGIN", false); // read by other pages to handle user session
        }
        console.log("navaaaaLLa", localStorage.getItem("LOGIN"));
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("VAVBAR LOGIN ", login);
    getUser();
    checkpath();
    getSearchData();
  }, [login, uid]);

  return (
    <div data-testid="userprofile">
      <Navbar bg="dark" id="nav-bar">
        
        <Navbar.Collapse className="justify-content-end">
          {showSearch ? (
            <Container>
            <Nav.Link onClick={()=> handleShow()}><p><b>Destination:</b> <u>{searchData["name"]}</u></p><b>Check In:</b> <u>{searchData["checkin"]}</u> <b>Check Out:</b> <u>{searchData["checkout"]}</u>    <b>Guests:</b> <u>{searchData["guests"]}</u></Nav.Link>
            </Container>
          ):(
            <></>
        )}
          {login ? (
            <Nav.Link href="/userspage">
              <Button variant="warning">User Profile</Button>
            </Nav.Link>
          ) : (
            <Nav.Link href="/login" data-testid="loginreg">
              <Button variant="warning">Login/Register</Button>
            </Nav.Link>
          )}
          {"  "}
          
        </Navbar.Collapse>
      </Navbar>
      <Modal show={show} onHide={handleClose}>
        <SearchHotel data={searchData} handle={handleClose}/>
      </Modal>
    </div>
    
  );
};

export default NavigationBar;
