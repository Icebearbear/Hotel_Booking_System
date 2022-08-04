import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";
import axios from "axios";
import SearchHotel from "./SearchHotel";
import Modal from 'react-bootstrap/Modal';


function SearchDataNav(){
  const [searchData, setSearchData] = useState();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  

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

    var no_of_guest = inputed["guests"];
    var guest_per_room = Math.floor(no_of_guest / inputed["rooms"]);
    var param_guests = "" + guest_per_room;
    for (var i = 0; i < inputed["rooms"] - 1; i++) {
        param_guests = param_guests + "|" + guest_per_room;
    }
    data["guests"] = param_guests;
    data["destination_id"] = inputed["destination_id"];
    data["checkin"] = dateFormat(inputed["checkin"]);
    data["checkout"] = dateFormat(inputed["checkout"]);
    console.log(data)
    setSearchData(data)
  };

  useEffect(() => {
    getSearchData();
  },[]);


  return (
    
    <>
    <Navbar bg="dark" id="nav-bar">
      <Navbar.Collapse className="justify-content-end">
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>
      </Navbar.Collapse>
    </Navbar>

    <Modal show={show} onHide={handleClose}>
        <SearchHotel data = {searchData}/>
    </Modal>
    </>
  );
};

export default SearchDataNav;
