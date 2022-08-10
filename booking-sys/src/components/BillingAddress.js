import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
} from "react-google-places-autocomplete";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Stack from "react-bootstrap/Stack";

function BillingAddress() {
  console.log("billing");

  let f_address = {
    street_number: "",
    postal_code: "",
    street: "",
    province: "",
    city: "",
    country: "",
  };
  const [address, setAddress] = useState();
  const [addressObj, setAddressObj] = useState(f_address);
  const [validated, setValidated] = useState(false); //for input field validation
  const [validity, setValidity] = useState(false); //for input field validation

  const getAddressObject = (address_components) => {
    console.log(address_components);
    const ShouldBeComponent = {
      street_number: ["street_number"],
      postal_code: ["postal_code"],
      street: ["street_address", "route"],
      province: [
        "administrative_area_level_1",
        "administrative_area_level_2",
        "administrative_area_level_3",
        "administrative_area_level_4",
        "administrative_area_level_5",
      ],
      city: [
        "locality",
        "sublocality",
        "sublocality_level_1",
        "sublocality_level_2",
        "sublocality_level_3",
        "sublocality_level_4",
      ],
      country: ["country"],
    };

    let address = {
      street_number: "",
      postal_code: "",
      street: "",
      province: "",
      city: "",
      country: "",
    };

    address_components.forEach((component) => {
      for (var shouldBe in ShouldBeComponent) {
        if (ShouldBeComponent[shouldBe].indexOf(component.types[0]) !== -1) {
          if (shouldBe === "country") {
            address[shouldBe] = component.short_name;
          } else {
            address[shouldBe] = component.long_name;
          }
        }
      }
    });

    // Fix the shape to match our schema
    address.address = address.street_number + " " + address.street;
    delete address.street_number;
    delete address.street;
    if (address.country === "US") {
      address.state = address.province;
      delete address.province;
    }
    return address;
  };

  useEffect(() => {
    const func = async () => {
      const geocodeObj =
        address &&
        address.value &&
        (await geocodeByPlaceId(address.value.place_id));
      const addressObject =
        geocodeObj && getAddressObject(geocodeObj[0].address_components);

      console.log("lalalal", address, " lolol", geocodeObj);
      if (
        typeof geocodeObj == "undefined" ||
        typeof geocodeObj == "null" ||
        geocodeObj == null ||
        address == null
      ) {
        console.log("innnn");
        setAddressObj(f_address);
      } else {
        console.log("innnn data");
        setAddressObj(addressObject);
      }
      console.log("addressObject", addressObject);
      console.log(addressObject);
    };

    func();
  }, [address, setAddressObj]);

  console.log(address);
  return (
    <div className="App">
      <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
        <Card style={{ width: "40rem", height: "fit-content" }}>
          <Card.Body>
            <Form noValidate validated={validated}>
              <h1>Billing Address</h1>
              <GooglePlacesAutocomplete
                apiKey="****"
                selectProps={{
                  isClearable: true,
                  value: address,
                  onChange: (val) => {
                    setAddress(val);
                  },
                }}
              />
              <Row className="mb-3">
                <Col md={5}>
                  <Form.Group className="mb-3" controlId="formBasicCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="string"
                      value={addressObj.city}
                      //   onChange={(e) => setCity(e.target.value)}
                      required
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      role="alert"
                      data-validity={validity}
                      data-testid="fb-city"
                    >
                      {"Please search for an address"}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={5}>
                  <Form.Group className="mb-3" controlId="formBasicZip">
                    <Form.Label>Zip/Post code</Form.Label>
                    <Form.Control
                      type="string"
                      value={addressObj.postal_code}
                      // onChange={(e) => setZipcode(e.target.value)}
                      required
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      role="alert"
                      data-validity={validity}
                      data-testid="fb-postalcode"
                    >
                      {"Please search for an address"}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={5}>
                  <Form.Group className="mb-3" controlId="formBasicCountry">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      type="string"
                      value={addressObj.country}
                      //   onChange={(e) => setCountryBill(e.target.value)}
                      required
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      role="alert"
                      data-validity={validity}
                      data-testid="fb-country"
                    >
                      {"Please search for an address"}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default BillingAddress;
