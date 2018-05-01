import React, {Component} from 'react'
import { Card, CardHeader, CardBody } from 'reactstrap'
import { InputGroup, Input, Button } from 'reactstrap'
import Map from './Map'
import Itinerary from './Itinerary'

/* Trip computes the map an intinerary based on a set of destinations and options.
 * The destinations and options reside in the parent object so they may be set by
 * the Destinations and Options classes.
 * The map and itinerary reside in this object so they can be passed to the Map and Itinerary classes.
 */
class Trip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tripName: ''
    };

    this.plan = this.plan.bind(this);
    this.saveTrip = this.saveTrip.bind(this);
  }

  /* Sends a request to the server with the destinations and options.
   * Receives a response containing the map and itinerary to update the
   * state for this object.
   */
  fetchResponse(){
    // need to get the request body from the trip in state object.
    let requestBody = {
        "type"    : "trip",
        "title"   : "PLANNING",
        "options" : { 
          "distance":"miles",
          "optimization":"none"
        },
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
    console.log(requestBody);

    return fetch('http://' + location.host + '/plan', {
      method:"POST",
      body: JSON.stringify(requestBody)
    });
  }

  async plan(){
    try {
      let serverResponse = await this.fetchResponse();
      let tffi = await serverResponse.json();
      console.log(tffi);
      this.props.updateTrip(tffi);
    } catch(err) {
      console.error(err);
    }
  }

  /* Saves the map and itinerary to the local file system.
   */
  saveTrip(){
    console.log('Save not implemented.');
  }

  /* Renders the buttons, map, and itinerary.
   * The title should be specified before the plan or save buttons are valid.
   */
  render(){
    return(
      <Card id={'Trip'}>
        <CardHeader className={'bg-info text-white'}>
          Trip
        </CardHeader>
        <CardBody>
          <p>Give your trip a title before planning or saving.</p>
          <InputGroup>
            <Button color='primary' onClick={this.plan}>Plan</Button>
            <Input placeholder={'Trip title...'}
                   onChange={(event) => this.props.updateTrip('title', event.target.value)}
            />
            <Button color='primary' onClick={this.saveTrip}>Save</Button>
          </InputGroup>
          <Map trip={this.props.trip} />
          <Itinerary trip={this.props.trip} />
        </CardBody>
      </Card>
    )
  }
}

export default Trip;