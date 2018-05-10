import React, {Component} from 'react';
import { Container } from 'reactstrap';
import Options from './Options';
import Destinations from './Destinations';
import Trip from './Trip/Trip';

/* Renders the application.
 * Holds the destinations and options state shared with the trip.
 */
class Application extends Component {
  constructor(props){
    super(props);
    this.state = {
      trip: {
        type: "trip",
        title: "",
        options : {
          distance: "miles"
        },
        places: [],
        distances: [],
        map: '<svg width="1920" height="20" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><g></g></svg>'
      }
    };
    this.updateTrip = this.updateTrip.bind(this);
    this.updateBasedOnResponse = this.updateBasedOnResponse.bind(this);
    this.updateOptions = this.updateOptions.bind(this);
  }

  updateTrip(field, value){
    let trip = this.state.trip;
    trip[field] = value;
    this.setState(trip);
  }

  updateBasedOnResponse(value) {
    this.setState({'trip': value});
  }

  updateOptions(option, value){
    let trip = this.state.trip;
    trip.options[option] = value;
    this.setState(trip);
  }

  render() {
    return(
      <Container id="Application">
        <Options options={this.state.trip.options} updateOptions={this.updateOptions}/>
        <Destinations trip={this.state.trip} updateTrip={this.updateTrip}/>
        <Trip trip={this.state.trip} updateTrip={this.updateTrip} updateBasedOnResponse={this.updateBasedOnResponse}/>
      </Container>
    )
  }
}

export default Application;