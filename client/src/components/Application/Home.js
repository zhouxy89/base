import React, {Component} from 'react'
import {Container, Row, Col, Card, CardHeader, CardBody} from 'reactstrap'

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Map, Marker, Popup, TileLayer} from 'react-leaflet';

export default class Info extends Component {

  render() {
    return (
      <Container>
        <Row>
          <Col xs={12} sm={12} md={7} lg={8} xl={9}>
            {this.renderMap()}
          </Col>
          <Col xs={12} sm={12} md={5} lg={4} xl={3}>
            {this.renderIntro()}
          </Col>
        </Row>
      </Container>
    )
  }

  renderMap() {
    let coloradoBoundaries = L.latLngBounds(L.latLng(41, -109), L.latLng(37, -102));
    let csuOval = [40.576179, -105.080773];

    return (
      <Card>
        <CardHeader>Where's Waldo?</CardHeader>
        <CardBody>
          <Map center={csuOval} zoom={5} >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            <Marker position={csuOval}><Popup>CSU Oval</Popup></Marker>
          </Map>
        </CardBody>
      </Card>
    )
  }

  renderIntro() {
    return(
      <Card>
        <CardHeader>Bon Voyage!</CardHeader>
        <CardBody>
          Let us help you plan your next trip.
        </CardBody>
      </Card>
    )
  }

}