import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class CustomerInformation extends React.Component {
  render() {
    return (
      <div className="d-flex justify-content-around">
        <Card style={{ width: "60rem", height: "60rem" }}>
          <Card.Body>
            {" "}
            Let us know who you are
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Full name</Form.Label>
                <Form.Control type="string" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Double check for typos"
                />
                {/* <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text> */}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Retype Email </Form.Label>
                <Form.Control type="email" />
              </Form.Group>

              <Row className="mb-3">
                <Form.Group
                  as={Col}
                  className="mb-3"
                  controlId="formBasicRetypeEmail"
                >
                  <Form.Label>Phone number optional</Form.Label>
                  <Form.Control type="email" />
                </Form.Group>

                <Form.Group
                  as={Col}
                  className="mb-3"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Country/region of residence</Form.Label>
                  <Form.Control type="string" />
                </Form.Group>
              </Row>

              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Please tick if you are booking for someone else"
                />
              </Form.Group>

              <Form.Group as={Col} className="mb-3">
                Do you have smoking preferences
                <Row>
                  <Col sm={2}>
                    <Form.Check
                      type="radio"
                      label="Non smoking"
                      name="NonSmokingRadio"
                      id="NonSmokingRadio"
                    />
                  </Col>
                  <Col sm={2}>
                    <Form.Check
                      type="radio"
                      label="Smoking"
                      name="SmokingRadio"
                      id="SmokingRadio"
                    />
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group as={Col} className="mb-3">
                What bed configuration do you prefer
                <Row>
                  <Col sm={2}>
                    <Form.Check
                      type="radio"
                      label="Large bed"
                      name="LargeBedRadio"
                      id="LergeBedRadio"
                    />
                  </Col>
                  <Col sm={2}>
                    <Form.Check
                      type="radio"
                      label="Twin bed"
                      name="TwinBedRadio"
                      id="TwinBedRadio"
                    />
                  </Col>
                </Row>
              </Form.Group>

              <Card style={{ width: "58rem" }}>
                <Card.Body>
                  Anymore requests?
                  <Form.Group as={Col} className="mb-3">
                    <Row>
                      <Col sm={20}>
                        <Form.Check
                          type="checkbox"
                          label="High floor room please"
                          name="HighFLoorRoomRadio"
                          id="HighFLoorRoomRadio"
                        />
                      </Col>
                      <Col sm={20}>
                        <Form.Check
                          type="checkbox"
                          label="Quiet room"
                          name="QuietRoomRadio"
                          id="QuietRoomRadio"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={10}>
                        <Form.Check
                          type="checkbox"
                          label="I Want Baby Bot (additional charges may apply)"
                          name="BabyCotRadio"
                          id="BabyCotRadio"
                        />
                      </Col>
                      <Col sm={10}>
                        <Form.Check
                          type="checkbox"
                          label="I want airport transfer"
                          name="AirportTransferRadio"
                          id="AirportTransferRadio"
                        />
                      </Col>
                    </Row>
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Any personal request?</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                  </Form.Group>
                </Card.Body>
              </Card>

              <Button variant="primary" type="submit">
                Proceed to next step
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default CustomerInformation;
