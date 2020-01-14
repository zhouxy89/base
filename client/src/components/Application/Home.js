import React, {Component} from 'react';
import {Container, Row, Col, Card} from 'reactstrap';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import { Map, Marker, Popup, TileLayer} from 'react-leaflet';

/*
 * Renders the home page.
 */
export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      clickedPosition: null,
      mouseDownTime: null,
      mapCenter: L.latLng(0,0),
      mapZoom: 1
    };
    this.handleMapMouseDown = this.handleMapMouseDown.bind(this);
    this.handleMapMouseUp = this.handleMapMouseUp.bind(this);
    this.handleMapMove = this.handleMapMove.bind(this);
  }

  render() {
    return (
      <Container>
        <Row>
          <Col xs="12">
            {this.renderMap()}
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
    var clickedPosition = '';
    if (this.state.clickedPosition) {
      clickedPosition = this.state.clickedPosition.lat.toFixed(2) + ', ' + this.state.clickedPosition.lng.toFixed(2);
    }
    return (
      <Map center={this.state.mapCenter}
           zoom={this.state.mapZoom}
           onMousedown={this.handleMapMouseDown}
           onMouseup={this.handleMapMouseUp}
           onMove={this.handleMapMove}
           style={{height: 400, maxwidth: 800}}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                   attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        {this.getMarker(clickedPosition, this.state.clickedPosition)}
      </Map>
    )
  }


  getMarker(bodyJSX, position) {
    if (position) {
      return (
          <Marker position={position} icon={this.markerIcon()}
                  onMouseOver={(e) => {e.target.openPopup();}}
                  onMouseOut={(e) => {e.target.closePopup();}}>
            <Popup className="font-weight-bold">{bodyJSX}</Popup>
          </Marker>
      );
    }
  }


  handleMapMouseDown(e) {
    this.setState({mouseDownTime: new Date()});
  }


  handleMapMouseUp(e) {
    if (this.state.mouseDownTime) {
      var elapsedMilliseconds = new Date() - this.state.mouseDownTime;
      if (elapsedMilliseconds > 250) {
        this.setState({clickedPosition: e.latlng});
      } else {
        this.setState({mapCenter: e.latlng, mapZoom: 15})
      }
    }
  }


  handleMapMove(e) {
    if (this.state.mouseDownTime) {
      this.setState({mouseDownTime: null})
    }
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
