import React from "react";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavigationBar from "./NavigationBar";
import BookingHistory from "./BookingHistory";
import UserProfile from "./UserProfile";
import "../css/user.min.css";
const UsersPage = () => {
  return (
    <div>
      <NavigationBar />
      <Container>
        <Row>
          <Col md={4}>
            <div className="userPage">
              <UserProfile />
            </div>
          </Col>
          <Col md={{ span: 8 }}>
            {" "}
            <BookingHistory />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UsersPage;
