import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BookingHistory from "./BookingHistory";
import UserProfile from "./UserProfile";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "../css/user.min.css";
import { useNavigate, useLocation } from "react-router-dom";
const UsersPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  //// for user session
  const login = sessionStorage.getItem("LOGIN");

  //const [login, setLogin] = useState(null);
  const [warning, setWarning] = useState(false);
  /////////

  useEffect(() => {
    console.log("login", login);
    {
      login != "null" ? onClose() : setWarning(true);
    }
  }, []);

  const onClose = () => {
    setWarning(false);
  };

  const onAgree = () => {
    localStorage.setItem("RETURN_PATH", location.pathname);
    setWarning(false);
    navigate("/login");
  };

  return (
    <div data-testid="user-page">
      {login != "null" ? (
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
          <Button variant="secondary" onClick={onAgree}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UsersPage;
