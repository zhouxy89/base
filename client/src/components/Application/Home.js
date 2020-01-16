import React, {Component} from 'react';
import {Col, Container, Row} from 'reactstrap';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';

/*
 * Renders the home page.
 */
export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      markerPosition: null,
      mouseDownTime: null,
      mapCenter: [0, 0],
      mapZoom: 1
    };
    this.startTimer = this.startTimer.bind(this);
    this.addMarkerOrCenter = this.addMarkerOrCenter.bind(this);
    this.clearTimer = this.clearTimer.bind(this);
    this.setZoomLevel = this.setZoomLevel.bind(this);
  }

  render() {
    return (
        <Container>
          <Row>
            <Col sm="12" md={{size: 6, offset: 3}}>
              {this.renderLeafletMap()}
            </Col>
          </Row>
        </Container>
    );
  }

  renderLeafletMap() {
    let markerPosition = '';
    if (this.state.markerPosition) {
      markerPosition = this.state.markerPosition.lat.toFixed(2) + ', ' + this.state.markerPosition.lng.toFixed(2);
    }
    return (
      <Map center={this.state.mapCenter}
           zoom={this.state.mapZoom}
           minZoom={1}
           maxBounds={[[-90, -180], [90, 180]]}
           onMousedown={this.startTimer}
           onMouseup={this.addMarkerOrCenter}
           onMove={this.clearTimer}
           onZoom={this.setZoomLevel}
           style={{height: 500, maxWidth: 500}}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                   attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        {this.getMarker(markerPosition, this.state.markerPosition)}
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


  startTimer(e) {
    this.setState({mouseDownTime: new Date()});
  }


  addMarkerOrCenter(e) {
    if (this.state.mouseDownTime) {
      var elapsedMilliseconds = new Date() - this.state.mouseDownTime;
      if (elapsedMilliseconds > 250) {
        this.setState({markerPosition: e.latlng});
      } else {
        this.setState({mapCenter: e.latlng, mapZoom: e.target.getZoom() + 2});
      }
    }
  }


  clearTimer(e) {
    if (this.state.mouseDownTime) {
      this.setState({mouseDownTime: null})
    }
  }

  setZoomLevel(e) {
    this.setState({mapZoom: e.target.getZoom()})
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
