import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button, Col, Row, Container, Stack } from "react-bootstrap";
import axios from "axios";
import { useLocation } from "react-router-dom";
import SearchHotel from "./SearchHotel";
import Modal from "react-bootstrap/Modal";
import { useAuth } from "./context/auth";

const NavigationBar = (props) => {
  const { setLoginSesh } = useAuth();
  const login = sessionStorage.getItem("LOGIN");
  console.log(login);
  const [uid, setUid] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();
  const [searchData, setSearchData] = useState({});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getUser = () => {
    try {
      axios.get("http://localhost:3001/getSession").then((res) => {
        // setLogin(res.data.login);
        console.log("navaaaaa", res.data);
        if (res.data.login == true) {
          setLoginSesh(res.data.login);
          //localStorage.setItem("LOGIN", true); // read by other pages to handle user session
        } else {
          setLoginSesh();

          // localStorage.setItem("LOGIN", false); // read by other pages to handle user session
        }
        console.log("navaaaaLLa", sessionStorage.getItem("LOGIN"));
      });
    } catch (error) {
      console.log(error);
    }
  };

  const checkpath = () => {
    console.log("Location pathname", location.pathname);
    if (
      location.pathname == "/searchhotelresult" ||
      location.pathname == "/viewhotel"
    ) {
      setShowSearch(true);
    } else {
      setShowSearch(false);
    }
  };

  function getSearchData() {
    var data = {};
    var inputed = JSON.parse(localStorage.getItem("SEARCH_DATA"));

    if (inputed == null) {
      return;
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
    console.log(data);
    setSearchData(data);
  }

  useEffect(() => {
    // setInterval(()=>)

    getUser();
    checkpath();
    getSearchData();
    // };
  }, []);

  return (
    <div data-testid="userprofile">
      <Navbar bg="dark" id="nav-bar">
        {showSearch ? (
          <div onClick={() => handleShow()}>
            <Stack direction="horizontal" gap={5}>
              <div className="vr" />
              <div className="vr" />
              <div className="vr" />
              <div className="vr" />
              <div className="vr" />
              <div className="vr" />
              <div className="vr" />
              <div className="vr" />
              {/* <div className="vr" />
              <div className="vr" /> */}
              <div>
                <h6 class="text-muted">Destination</h6>
                <h6 class="text-light bg-dark">{searchData["name"]}</h6>
              </div>
              <div className="vr" />
              <div>
                <h6 class="text-muted">Check In</h6>
                <h6 class="text-light bg-dark">{searchData["checkin"]}</h6>
              </div>
              <div className="vr" />
              <div>
                <h6 class="text-muted">Check Out</h6>{" "}
                <h6 class="text-light bg-dark">{searchData["checkout"]}</h6>
              </div>
              <div className="vr" />
              <div>
                <h6 class="text-muted">Guests</h6>
                <h6 class="text-light bg-dark">
                  {searchData["guests"]} Adults
                </h6>
              </div>
            </Stack>
          </div>
        ) : (
          <></>
        )}
        <Navbar.Collapse className="justify-content-end">
          {login != "null" ? (
            <Nav.Link href="/userspage">
              <Button variant="warning">User Profile</Button>
            </Nav.Link>
          ) : (
            <Nav.Link
              href="/login"
              data-testid="loginreg"
              onClick={() => {
                localStorage.setItem("RETURN_PATH", location.pathname);
              }}
            >
              <Button variant="warning">Login/Register</Button>
            </Nav.Link>
          )}
          <div className="vr" />
        </Navbar.Collapse>
      </Navbar>
      <Modal show={show} onHide={handleClose}>
        <SearchHotel data={searchData} handle={handleClose} />
      </Modal>
    </div>
  );
};

export default NavigationBar;
