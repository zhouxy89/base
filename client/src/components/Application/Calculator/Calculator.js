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
      first: {latitude: '', longitude: ''},
      second: {latitude: '', longitude: ''},
      distance: 0
    };

    this.update_input = this.update_input.bind(this);
    this.calculate_distance = this.calculate_distance.bind(this);
  }

  update_input(id, field, value) {
    let temp = Object.assign({}, this.state[id]);
    temp[field] = value;
    this.setState({[id]: temp});
  }

  parse_location_info(location) {
    let temp = Object.assign({}, location);
    temp['latitude'] = parseFloat(temp['latitude']);
    temp['longitude'] = parseFloat(temp['longitude']);

    return temp;
  }

  calculate_distance() {
    const body = {
      'type'        : 'distance',
      'version'     : '4',
      'origin'      : this.parse_location_info(this.state.first),
      'destination' : this.parse_location_info(this.state.second),
      'units'       : this.props.unit
    };

    sendHttpPostRequest(body, 'distance', this.props.options.hostname).then(
        (response) => {
          this.setState({distance: response.distance});
        }
    );
  }

  create_input_fields(title, id) {
    let hoc_update = (e) => {this.update_input(id, e.target.name, e.target.value)};
    return (
        <Card>
          <CardHeader>{title}</CardHeader>
          <CardBody>
            <Form >
              <Input name='latitude' onChange={hoc_update} value={this.state[id]['latitude']}
                     style={{width: "100%"}} placeholder="Latitude"/>
              <Input name='longitude' onChange={hoc_update} value={this.state[id]['longitude']}
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

  render() {
    return (
        <Container>
          <Row>
            <Col>
              <Card>
                <CardHeader>
                Calculator:  The distance...
                </CardHeader>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={6} md={4} lg={3}>
              {this.create_input_fields('from', 'first')}
            </Col>
            <Col xs={12} sm={6} md={4} lg={3}>
              {this.create_input_fields('to', 'second')}
            </Col>
            <Col xs={12} sm={6} md={4} lg={3}>
              {this.create_distance()}
            </Col>
          </Row>
        </Container>
    );
  }
}