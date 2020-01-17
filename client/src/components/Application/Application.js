import React, {Component} from 'react';
import {Col, Container, Row} from 'reactstrap';

import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';

import Pane from './Pane'

const MAX_BOUNDS = [
    [-90, -180],
    [90, 180]
];
const MAP_STYLE_LENGTH = 500;
const ADD_MARKER_AFTER_TIME_THRESHOLD = 250;
const ADD_MARKER_ZOOM_LEVEL = 12;


export default class Application extends Component {
  constructor(props) {
    super(props);

    this.updatePlanOption = this.updatePlanOption.bind(this);
    this.updateClientSetting = this.updateClientSetting.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.addMarkerOrCenter = this.addMarkerOrCenter.bind(this);
    this.clearTimer = this.clearTimer.bind(this);
    this.setZoomLevel = this.setZoomLevel.bind(this);

    this.state = {
      planOptions: {
        units: {'miles': 3959},
        activeUnit: 'miles'
      },
      markerPosition: null,
      mouseDownTime: null,
      mapCenter: [0, 0],
      mapZoom: 1,
    };
  }

  render() {
    return (
        <div className='application-width'>
          {this.props.errorMessage}
          <Container>
            <Row>
              <Col sm="12" md={{size: 6, offset: 3}}>
                {this.renderLeafletMap()}
              </Col>
            </Row>
          </Container>
        </div>
    );
  }

  updateClientSetting(field, value) {
    let newSettings = Object.assign({}, this.state.planOptions);
    newSettings[field] = value;
    this.props.modify('clientSettings', newSettings);
  }

  updatePlanOption(option, value) {
    let optionsCopy = Object.assign({}, this.state.planOptions);
    optionsCopy[option] = value;
    this.setState({'planOptions': optionsCopy});
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
             maxBounds={MAX_BOUNDS}
             onMousedown={this.startTimer}
             onMouseup={this.addMarkerOrCenter}
             onMove={this.clearTimer}
             onZoom={this.setZoomLevel}
             style={{height: MAP_STYLE_LENGTH, maxWidth: MAP_STYLE_LENGTH}}>
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
      let elapsedMilliseconds = new Date() - this.state.mouseDownTime;
      if (elapsedMilliseconds > ADD_MARKER_AFTER_TIME_THRESHOLD) {
        let newState = {markerPosition: e.latlng, mapCenter: e.latlng};
        if (e.target.getZoom() <= ADD_MARKER_ZOOM_LEVEL) {
          newState['mapZoom'] = ADD_MARKER_ZOOM_LEVEL;
        }
        this.setState(newState);
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
      iconAnchor: [12, 40]  // for proper placement
    })
  }
}
