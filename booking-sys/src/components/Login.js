import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { Link } from "react-router-dom";
// import "../App.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3001/user")
  //     .then((res) => {
  //       setUser(res);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   if (user) {
  //     navigate("/mainpage");
  //   }
  // }, [user]);

  const onSubmit = () => {
    const userObject = {
      email: email,
      password: password,
    };
    axios
      .post("http://localhost:3001/login", userObject)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="d-flex justify-content-around">
      <Card style={{ width: "30rem", height: "30rem" }}>
        <Card.Body>
          <h1>Login page</h1>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Keep me signed in" />
            </Form.Group>
            <Link className="link" to="/searchhotel">
              <Button
                onClick={onSubmit}
                variant="primary"
                type="submit"
                className="float-right"
              >
                Submit
              </Button>
            </Link>
          </Form>
          <div className="reg-link">
            <Link className="link" to="/registration">
              <li>Register Now</li>
            </Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Login;
