import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Register from "./Register";
import UserProfile from "./UserProfile";

// import "../App.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      email: "",
      password: "",
    };
  }
  onChangeEmail(e) {
    console.log("email");
    this.setState({ email: e.target.value });
  }
  onChangePassword(e) {
    this.setState({ password: e.target.value });
  }
  onSubmit(e) {
    console.log("submitted");
    e.preventDefault();
    const userObject = {
      email: this.state.email,
      password: this.state.password,
    };
    axios
      .post("http://localhost:3001/login", userObject)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    this.setState({ email: "", password: "" });
  }
  render() {
    return (
      // <BrowserRouter>
      <div className="d-flex justify-content-around">
        <Card style={{ width: "30rem", height: "30rem" }}>
          <Card.Body>
            <h1>Login page</h1>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                  type="email"
                  placeholder="Enter email"
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={this.state.password}
                  onChange={this.onChangePassword}
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Keep me signed in" />
              </Form.Group>

              <Button
                onClick={this.onSubmit}
                variant="primary"
                type="submit"
                className="float-right"
              >
                Submit
              </Button>
            </Form>
            <div className="reg-link">
              <Link className="link" to="/registration">
                <li>Register Now</li>
              </Link>
            </div>
          </Card.Body>
        </Card>

        {/* <Routes>
            <Route path="/" element={<UserProfile />} />
            <Route path="/register" element={<Register />} />
          </Routes> */}
      </div>
    );
  }
}

export default Login;
