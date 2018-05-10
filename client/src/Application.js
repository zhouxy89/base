import React, {Component} from 'react';
import { Container } from 'reactstrap';
import Options from './Options';
import Destinations from './Destinations';
import Trip from './Trip';

/* Renders the application.
 * Holds the destinations and options state shared with the trip.
 */
class Application extends Component {
  constructor(props){
    super(props);
    this.state = {
      type: "trip",
      title: "",
      options : {
        distance: "miles"
      },
      places: [],
      distances: [],
      map: '<svg width="1920" height="20" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><g></g></svg>'
    };
    this.updateTrip = this.updateTrip.bind(this);
    this.updateBasedOnResponse = this.updateBasedOnResponse.bind(this);
    this.updateOptions = this.updateOptions.bind(this);
  }

  updateTrip(field, value){
    this.setState({[field]: value});
  }

  updateBasedOnResponse(value) {
    this.setState(value);
  }

  updateOptions(option, value){
    let options = this.state.options;
    options[option] = value;
    this.setState(options);
  }

  render() {
    return(
      <Container id="Application">
        <Options options={this.state.options} updateOptions={this.updateOptions}/>
        <Destinations trip={this.state} updateTrip={this.updateTrip}/>
        <Trip trip={this.state} updateTrip={this.updateTrip} updateBasedOnResponse={this.updateBasedOnResponse}/>
      </Container>
    )
  }
}

export default Application;