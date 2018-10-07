import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import { Card, CardHeader } from 'reactstrap'
import { Input, InputGroup } from 'reactstrap'

export default class Calculator
  extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Row>
          <Col md={{size: 4}} className='align-self-center'>
            <Card>
              <CardHeader>
                First Location
              </CardHeader>
              <InputGroup>
                <Input placeholder="Latitude"/>
                <Input placeholder="Longitude"/>
              </InputGroup>
            </Card>
          </Col>
          <Col md={{size: 4}}>
            <Card>
              <CardHeader>
                First Location
              </CardHeader>
              <InputGroup>
                <Input placeholder="Latitude"/>
                <Input placeholder="Longitude"/>
              </InputGroup>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}