import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { Link } from "react-router-dom";
// import "../App.css";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeFName = this.onChangeFName.bind(this);
    this.onChangeLName = this.onChangeLName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      password: "",
    };
  }
  onChangeFName(e) {
    this.setState({ fname: e.target.value });
  }
  onChangeLName(e) {
    this.setState({ lname: e.target.value });
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
      first_name: this.state.fname,
      last_name: this.state.lname,
      email: this.state.email,
      password: this.state.password,
    };
    axios
      .post("http://localhost:3001/register", userObject)
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
      <div className="d-flex justify-content-around">
        {/* <h1>Register</h1> */}
        <Card style={{ width: "30rem", height: "30rem" }}>
          <Card.Body>
            <h1>Register page</h1>

            <Form>
              <Form.Group className="mb-3" controlId="formBasicFname">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  value={this.state.fname}
                  onChange={this.onChangeFName}
                  type="string"
                  placeholder="Enter First Name"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicLname">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  value={this.state.lname}
                  onChange={this.onChangeLName}
                  type="string"
                  placeholder="Enter Last Name"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                  type="email"
                  placeholder="Enter email"
                />
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

              <Button
                onClick={this.onSubmit}
                variant="primary"
                type="submit"
                className="float-right"
              >
                Submit
              </Button>
              <div className="reg-link">
                <Link className="link" to="/login">
                  <li>Login</li>
                </Link>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Register;
