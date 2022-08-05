import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BookingHistory from "./BookingHistory";
import UserProfile from "./UserProfile";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "../css/user.min.css";
const UsersPage = () => {
  //// for user session
  const [login, setLogin] = useState("false");
  const [warning, setWarning] = useState(false);
  /////////

  useEffect(() => {
    const lin = localStorage.getItem("LOGIN");
    console.log("linn userspage", lin, typeof lin);
    setLogin(lin);
    {
      login == "true" ? onClose() : setWarning(true);
    }
  }, [login]);

  const onClose = () => {
    setWarning(false);
  };

  return (
    <div data-testid="user-page">
      {login == "true" ? (
        <Container>
          <Row>
            <Col md={4}>
              <div className="userPage" data-testid="user-profile-page">
                <UserProfile />
              </div>
            </Col>
            <Col md={{ span: 8 }}>
              {" "}
              <div data-testid="booking-history-page">
                <BookingHistory />
              </div>
            </Col>
          </Row>
        </Container>
      ) : (
        <div></div>
      )}

      <Modal
        show={warning}
        onHide={onClose}
        centered
        data-testid="popup_login_warning"
      >
        <Modal.Header closeButton>
          <Modal.Title>User Page require login</Modal.Title>
        </Modal.Header>
        <Modal.Body>Login is required</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Back
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UsersPage;
