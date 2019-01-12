import React, {Component} from 'react';
import {Container, Row, Col, Card, CardHeader, CardBody} from 'reactstrap';

import Leaflet from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import { Map, Marker, Popup, TileLayer} from 'react-leaflet';

/*
 * Renders the home page.
 */
export default class Home extends Component {

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
    );
  }

  renderMap() {
    return (
      <Card>
        <CardHeader>Where's Waldo?</CardHeader>
        <CardBody>{this.renderLeafletMap()}</CardBody>
      </Card>
    );
  }

  renderLeafletMap() {
    // initial map placement can use either of these approaches:
    // 1: bounds={this.coloradoGeographicBoundaries()}
    // 2: center={this.csuOvalGeographicCoordinates()} zoom={10}
    return (
      <Map center={this.csuOvalGeographicCoordinates()} zoom={10}
           style={{height: 500, maxwidth: 700}}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                   attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        <Marker position={this.csuOvalGeographicCoordinates()}
                icon={this.markerIcon()}>
          <Popup>Colorado State University</Popup>
        </Marker>
      </Map>
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
    );
  }

  coloradoGeographicBoundaries() {
    // northwest and southeast corners of the state of Colorado
    return L.latLngBounds(L.latLng(41, -109), L.latLng(37, -102));
  }

  csuOvalGeographicCoordinates() {
    return L.latLng(40.576179, -105.080773);
  }

  markerIcon() {
    // react-leaflet does not currently handle default marker icons correctly,
    // so we must create our own
    return L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow,
      iconAnchor: [12,40]  // for proper placement
    })
  }
}
