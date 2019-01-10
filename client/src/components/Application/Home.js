import React, {Component} from 'react';
import {Container, Row, Col, Card, CardHeader, CardBody} from 'reactstrap';

import Leaflet from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
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
    );
  }

  renderMap() {
    return (
      <Card>
        <CardHeader>Where's Waldo?</CardHeader>
        <CardBody>
          <Map bounds={this.coloradoGeographicBoundaries()}
               style={{height: 500, maxwidth: 700}}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                       attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            <Marker position={this.csuOvalGeographicCoordinates()}
                    icon={this.markerIcon()}>
              <Popup>Colorado State University</Popup>
            </Marker>
          </Map>
        </CardBody>
      </Card>
    );
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
    return L.latLngBounds(L.latLng(41, -109), L.latLng(37, -102));
  }

  csuOvalGeographicCoordinates() {
    return L.latLng(40.576179, -105.080773);
  }

  markerIcon() {
    // react-leaflet does not currently pull default marker icons correctly,
    // so this must be done manually
    return L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow,
      iconAnchor: [12,40]  // for proper placement
    })
  }
}
