import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Card, CardHeader, CardBody } from 'reactstrap'
import { Button } from 'reactstrap'
import { Form, Label, Input } from 'reactstrap'
import { sendHttpPostRequest } from '../../../api/restfulAPI'

export default class Calculator extends Component {
  constructor(props) {
    super(props);
  
    this.updateLocationOnChange = this.updateLocationOnChange.bind(this);
    this.calculate_distance = this.calculate_distance.bind(this);
  
    this.state = {
      origin: {latitude: '', longitude: ''},
      destination: {latitude: '', longitude: ''},
      distance: 0
    };
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            {this.create_header()}
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6} md={4} lg={3}>
            {this.create_input_fields('origin')}
          </Col>
          <Col xs={12} sm={6} md={4} lg={3}>
            {this.create_input_fields('destination')}
          </Col>
          <Col xs={12} sm={6} md={4} lg={3}>
            {this.create_distance()}
          </Col>
        </Row>
      </Container>
    );
  }

  create_header() {
    return (
      <Card>
        <CardHeader>Calculator</CardHeader>
        <CardBody>
          Determine the distance between the origin and destination.
          Change the units on the <b>Options</b> page.
        </CardBody>
      </Card>
    )
  }

  create_input_fields(stateVar) {
    let updateOnChange = (e) => {this.updateLocationOnChange(stateVar, e.target.name, e.target.value)};
    return (
      <Card>
        <CardHeader>{stateVar.charAt(0).toUpperCase() + stateVar.slice(1)}</CardHeader>
        <CardBody>
          <Form >
            <Input name='latitude' onChange={updateOnChange} value={this.state[stateVar]['latitude']}
                   style={{width: "100%"}} placeholder="Latitude"/>
            <Input name='longitude' onChange={updateOnChange} value={this.state[stateVar]['longitude']}
                   style={{width: "100%"}} placeholder="Longitude"/>
          </Form>
        </CardBody>
      </Card>
    );
  }

  create_distance() {
    return(
      <Card>
        <CardHeader>Distance</CardHeader>
        <CardBody>
          <h5>{this.state.distance} {this.props.options.unit}</h5>
          <Button onClick={this.calculate_distance}>Calculate</Button>
        </CardBody>
      </Card>
    )
  }

  calculate_distance() {
    const tipConfigRequest = {
      'type'        : 'distance',
      'version'     : 1,
      'origin'      : this.state.origin,
      'destination' : this.state.destination,
      'earthRadius' : this.props.options.units[this.props.options.unit]
    };

    sendHttpPostRequest('distance', tipConfigRequest, this.props.options.serverPort)
        .then((response) => {this.setState({distance: response.distance}); }
    );
  }

  updateLocationOnChange(stateVar, field, value) {
    let location = Object.assign({}, this.state[stateVar]);
    location[field] = value;
    this.setState({[stateVar]: location});
  }
  
}