import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Card, CardHeader } from 'reactstrap'
import { Input, InputGroup } from 'reactstrap'

export default class Calculator
  extends Component {
  constructor(props) {
    super(props);
  }

  create_input_fields(title) {
    return (
        <Card>
          <CardHeader >
            {title}
          </CardHeader>
          <Input placeholder="Latitude"/>
          <Input placeholder="Longitude"/>
        </Card>
      );
  }

  render() {
    return (
      <Container>
        <Row>
          <Col md={{size: 4, offset: 2}} className='align-self-center'>
            {this.create_input_fields('First Location')}
          </Col>
          <Col md={{size: 4}}>
            {this.create_input_fields('Second Location')}
          </Col>
        </Row>
      </Container>
    )
  }
}