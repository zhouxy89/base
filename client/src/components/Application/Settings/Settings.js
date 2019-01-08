import React, {Component} from 'react'
import {Container, Row, Col, Card, CardHeader, CardBody} from 'reactstrap'

export default class Settings extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Row>
          <Col xs="12">
              <Card>
                <CardHeader>Settings</CardHeader>
              </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}
