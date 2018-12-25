import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Card, CardHeader, CardBody } from 'reactstrap'
import { Button } from 'reactstrap'
import { Form, Label, Input } from 'reactstrap'
import { sendHttpPostRequest } from '../../../api/restfulAPI'


export default class Calculator
    extends Component {
  constructor(props) {
    super(props);
    this.state = {
      origin: {latitude: '', longitude: ''},
      destination: {latitude: '', longitude: ''},
      distance: 0
    };

    this.updateStateOnChange = this.updateStateOnChange.bind(this);
    this.calculate_distance = this.calculate_distance.bind(this);
  }


  updateStateOnChange(id, field, value) {
    let temp = Object.assign({}, this.state[id]);
    temp[field] = value;
    this.setState({[id]: temp});
  }


  calculate_distance() {
    const tipConfigRequest = {
      'type'        : 'distance',
      'version'     : 1,
      'origin'      : this.state.origin,
      'destination' : this.state.destination,
      'earthRadius'  : this.props.options.units[this.props.options.unit]
    };

    sendHttpPostRequest('distance', tipConfigRequest, this.props.options.serverPort)
        .then((response) => {this.setState({distance: response.distance}); }
    );
  }


  create_input_fields(title, id) {
    let updateOnChange = (e) => {this.updateStateOnChange(id, e.target.name, e.target.value)};
    return (
        <Card>
          <CardHeader>{title}</CardHeader>
          <CardBody>
            <Form >
              <Input name='latitude' onChange={updateOnChange} value={this.state[id]['latitude']}
                     style={{width: "100%"}} placeholder="Latitude"/>
              <Input name='longitude' onChange={updateOnChange} value={this.state[id]['longitude']}
                     style={{width: "100%"}} placeholder="Longitude"/>
            </Form>
          </CardBody>
        </Card>
    );
  }


  create_distance() {
    return(
        <Card>
          <CardHeader>is</CardHeader>
          <CardBody>
            <h5>{this.state.distance} {this.props.options.unit}</h5>
            <Button onClick={this.calculate_distance}>Calculate</Button>
          </CardBody>
        </Card>
    )
  }

  create_header() {
    return (
        <Card>
          <CardHeader>
            Calculator:  The distance...
          </CardHeader>
        </Card>
    )
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
              {this.create_input_fields('from', 'origin')}
            </Col>
            <Col xs={12} sm={6} md={4} lg={3}>
              {this.create_input_fields('to', 'destination')}
            </Col>
            <Col xs={12} sm={6} md={4} lg={3}>
              {this.create_distance()}
            </Col>
          </Row>
        </Container>
    );
  }
}