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
      itinerary: null
    }
  }

  /* Sends a request to the server with the destinations and options.
   * Receives a response containing the map and itinerary to update the
   * state for this object.
   */
  fetchResponse(){
    return fetch("http://localhost:31400/plan", {
      method:"POST",
      body:null
    });
  }

  async plan(){
    try {
      let resp = await this.fetchResponse();
      console.log(resp);
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
              <span class="input-group-btn">
              <button class="btn btn-primary " type="button">Plan</button>
            </span>
              <input type="text" class="form-control" placeholder="Trip title..."/>
              <span class="input-group-btn">
              <button class="btn btn-primary " type="button">Save</button>
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