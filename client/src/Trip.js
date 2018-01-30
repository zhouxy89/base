import React, {Component} from 'react';
import Map from './Map';
import Itinerary from './Itinerary';

/* Trip computes the map an intinerary based on a set of destinations and options.
 * The destinations and options reside in the parent object so they may be set by
 * the Destinations and Options classes.
 * The map and itinerary reside in this object so they can be passed to the Map and Itinerary classes.
 */
class Trip extends Component {
  constructor(props) {
    super(props);
    this.state={
      map: '<svg width="1106" height="480" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><!-- Created with SVG-edit - http://svg-edit.googlecode.com/ --><g> <g id="svg_4"><svg id="svg_1" height="480" width="1106" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg"><g id="svg_2"><title>Layer 1</title><rect fill="#ffffff" stroke="#000000" stroke-width="4" x="0" y="0" width="1106" height="480" id="svg_3"/></g></svg> </g></g></svg>',
      itinerary: [["Paris"], ["France"], [30]]
    }

    this.plan = this.plan.bind(this);
  }

  /* Sends a request to the server with the destinations and options.
   * Receives a response containing the map and itinerary to update the
   * state for this object.
   */
  fetchResponse(){
    let body = {
        "type"    : "trip",
        "title"   : "PLANNING",
        "places"  : [
          {"id":"dnvr", "name":"Denver", "latitude": "", "longitude": ""},
          {"id":"bldr", "name":"Boulder", "latitude": "", "longitude": ""},
          {"id":"foco", "name":"Fort Collins", "latitude": "", "longitude": ""},
          {"id":"grly", "name":"Greeley", "latitude": "", "longitude": ""},
          {"id":"fomo", "name":"Fort Morgan", "latitude": "", "longitude": ""},
          {"id":"frst", "name":"Firestone", "latitude": "", "longitude": ""}
          ]
      };

    console.log(process.env.SERVICE_URL);
    console.log(body);

    return fetch(process.env.SERVICE_URL + '/plan', {
      method:"POST",
      body: JSON.stringify(body)
    });
  }

  async plan(){
    try {
      let resp = await this.fetchResponse();
      let x = await resp.json();
      console.log(x);
    } catch(err) {
      console.error(err);
    }
  }

  /* Saves the map and itinerary to the local file system.
   */
  save(){
  }

  /* Renders the buttons, map, and itinerary.
   * The title should be specified before the plan or save buttons are valid.
   */
  render(){
    return(
        <div id="trip" className="card">
          <div className="card-header bg-info text-white">
            Trip
          </div>
          <div className="card-body">
            <p>Give your trip a title before planning or saving.</p>
            <div className="input-group" role="group">
              <span className="input-group-btn">
              <button className="btn btn-primary " onClick={this.plan} type="button">Plan</button>
            </span>
              <input type="text" className="form-control" placeholder="Trip title..."/>
              <span className="input-group-btn">
              <button className="btn btn-primary " type="button">Save</button>
            </span>
            </div>
            <Map map={this.state.map} options={this.props.options} />
            <Itinerary itinerary={this.state.itinerary} options={this.props.options} />
          </div>
        </div>
    )
  }
}

export default Trip;