import React, {Component} from 'react';
import {Container, Row, Col, Card, Input} from 'reactstrap';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import { Map, Marker, Popup, TileLayer} from 'react-leaflet';
import Pane from './Pane'

/*
 * Renders the home page.
 */
export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      clickedPosition: null
    };
    this.handleMapClick = this.handleMapClick.bind(this);
  }

  render() {
    return (
      <Container>
        <Row>
          <Col xs="12">
            {this.renderMap()}
          </Col>
        </Row>
        <Row>
          <Col xs="6">
            {this.renderItinerary()}
          </Col>
        </Row>
      </Container>
    );
  }

  renderMap() {
    return (
      <Card>
        {this.renderLeafletMap()}
      </Card>
    );
  }

  renderLeafletMap() {
    // initial map placement can use either of these approaches:
    // 1: bounds={this.coloradoGeographicBoundaries()}
    // 2: center={this.csuOvalGeographicCoordinates()} zoom={10}
    return (
      <Map center={this.csuOvalGeographicCoordinates()} zoom={10}
           style={{height: 500, maxwidth: 700}}
           onClick={this.handleMapClick}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                   attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        {this.getMarker('Colorado State University', this.csuOvalGeographicCoordinates())}
        {this.getMarker('You clicked here!', this.state.clickedPosition)}

      </Map>
    )
  }

  renderItinerary() {
    // disabled='disabled'
    var clickedPosition = '';
    if (this.state.clickedPosition) {
      clickedPosition = this.state.clickedPosition.lat.toFixed(2) + ', ' + this.state.clickedPosition.lng.toFixed(2);
    }
    return(
        <Card>
          <Input value={clickedPosition} className='font-weight-semibold'/>
        </Card>
  );
  }

  renderIntro() {
    return(
      <Pane header={'Bon Voyage!'}
            bodyJSX={'Let us help you plan your next trip.'}/>
    );
  }

  csuOvalGeographicCoordinates() {
    return L.latLng(40.576179, -105.080773);
  }


  getMarker(bodyJSX, position) {
    if (position) {
      return (
          <Marker position={position} icon={this.markerIcon()}>
            <Popup className="font-weight-bold">{bodyJSX}</Popup>
          </Marker>
      );
    }
  }

  handleMapClick(e) {
    this.setState({clickedPosition: e.latlng});
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
