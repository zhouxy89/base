import React, {Component} from 'react'
import { Container, Card, CardHeader, CardBody } from 'reactstrap'
import { InputGroup, Input, Button } from 'reactstrap'
import Map from './Map'
import Itinerary from './Itinerary'
import { request } from '../../../api/api.js'

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

    this.sendPlanRequest = this.sendPlanRequest.bind(this);
    this.saveTrip = this.saveTrip.bind(this);
  }

  /* Sends a request to the server with the destinations and options.
   * Receives a response containing the map and itinerary to update the
   * state for this object.
   */

  /* Saves the map and itinerary to the local file system.
   */
  saveTrip(){
    console.log('Save not implemented.');
  }

  async sendPlanRequest() {
    console.log("PLANNING");

    // TODO need to get the request body from the trip in state object.
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

    try {
      let tffi = await request(requestBody, "plan");
      console.log(tffi);
      this.props.updateBasedOnResponse(tffi);
    } catch (err) {
      console.error(err);
    }
  }

  /* Renders the buttons, map, and itinerary.
   * The title should be specified before the plan or save buttons are valid.
   */
  render(){
    // Render the Map and Itinerary if there are locations or don't show anything.
    let itinerary;
    if(this.props.trip.places.length > 0) {
      itinerary = (
        <Container>
          <Map trip={this.props.trip} />
          <Itinerary trip={this.props.trip} />
        </Container>
      )
    }

    return(
      <Card id='Trip'>
        <CardHeader className='bg-info text-white'>
          Trip
        </CardHeader>
        <CardBody>
          <p>Give your trip a title before planning or saving.</p>
          <InputGroup>
            <Button color='primary' onClick={this.sendPlanRequest}>Plan</Button>
            <Input placeholder={'Trip title...'}
                   onChange={(event) => this.props.updateTrip('title', event.target.value)}
            />
            <Button color='primary' onClick={this.saveTrip}>Save</Button>
          </InputGroup>
          {itinerary}
        </CardBody>
      </Card>
    )
  }
}

export default Trip;