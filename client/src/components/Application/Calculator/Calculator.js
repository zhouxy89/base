import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Card, CardHeader, CardBody } from 'reactstrap'
import { Button } from 'reactstrap'
import { Form, Label, Input } from 'reactstrap'

import { sendServerRequestWithBody } from '../../../api/restfulAPI'
import ErrorBanner from '../ErrorBanner';

export default class Calculator extends Component {
  constructor(props) {
    super(props);

    this.updateLocationOnChange = this.updateLocationOnChange.bind(this);
    this.calculateDistance = this.calculateDistance.bind(this);

    this.state = {
      origin: {latitude: '', longitude: ''},
      destination: {latitude: '', longitude: ''},
      distance: 0,
      errorMessage: null
    };
  }

  render() {
    return (
      <Container>
        { this.state.errorMessage }
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
        <CardHeader className='bg-csu-gold text-white font-weight-semibold'>Calculator</CardHeader>
        <CardBody>
          Determine the distance between the origin and destination.
          Change the units on the <b>Options</b> page.
        </CardBody>
      </Card>
    )
  }

  create_input_fields(stateVar) {
    let updateStateVarOnChange = (event) => {
      this.updateLocationOnChange(stateVar, event.target.name, event.target.value)};
    return (
      <Card>
        <CardHeader className='bg-csu-gold text-white font-weight-semibold'>{stateVar.charAt(0).toUpperCase() + stateVar.slice(1)}</CardHeader>
        <CardBody>
          <Form >
            <Input name='latitude' placeholder="Latitude"
                   value={this.state[stateVar]['latitude']}
                   onChange={updateStateVarOnChange}
                   style={{width: "100%"}} />
            <Input name='longitude' placeholder="Longitude"
                   value={this.state[stateVar]['longitude']}
                   onChange={updateStateVarOnChange}
                   style={{width: "100%"}}/>
          </Form>
        </CardBody>
      </Card>
    );
  }

  create_distance() {
    return(
      <Card>
        <CardHeader className='bg-csu-gold text-white font-weight-semibold'>Distance</CardHeader>
        <CardBody>
          <h5>{this.state.distance} {this.props.options.unit}</h5>
          <Button className='btn-csu' onClick={this.calculateDistance}>Calculate</Button>
        </CardBody>
      </Card>
    )
  }

  calculateDistance() {
    const tipConfigRequest = {
      'type'        : 'distance',
      'version'     : 1,
      'origin'      : this.state.origin,
      'destination' : this.state.destination,
      'earthRadius' : this.props.options.units[this.props.options.unit]
    };

    sendServerRequestWithBody('distance', tipConfigRequest, this.props.settings.serverPort)
      .then((response) => {
        if(response.statusCode >= 200 && response.statusCode <= 299) {
          this.setState({
            distance: response.body.distance,
            errorMessage: null
          });
        }
        else {
          this.setState({
            errorMessage: <ErrorBanner statusText={ response.statusText }
                                       statusCode={ response.statusCode }
                                       message={ `Request to ${ this.props.settings.serverPort } failed.` }/>
          });
        }
      });
  }

  updateLocationOnChange(stateVar, field, value) {
    let location = Object.assign({}, this.state[stateVar]);
    location[field] = value;
    this.setState({[stateVar]: location});
  }
}
