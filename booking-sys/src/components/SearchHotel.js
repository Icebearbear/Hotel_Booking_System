import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

function SearchHotel() {
  // prompt user these data and pass to SearchHotelResult to search for hotels
  const passData = {
    UID: "Singapore",
    startDate: "startd",
    endDate: "endd",
    fullName: "hotel name",
  };
  return (
    <div className="d-flex justify-content-around">
      <Card style={{ width: "50rem", height: "30rem" }}>
        <Card.Body>
          <h1>Search Page</h1>

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
  );
}

export default SearchHotel;
