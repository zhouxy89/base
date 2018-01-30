import React, {Component} from 'react';
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
      options: {
        units:"miles"
      },
      destinations: null
    }
    this.updateDestinations = this.updateDestinations.bind(this);
    this.updateOptions = this.updateOptions.bind(this);
  }

  updateDestinations(args){
    console.log(args[0].name);
    this.setState({destinations:args[0].name});
  }

  updateOptions(args){
    console.log(args);
    this.setState({options: args});
  }

  render() {
    const destTitle=(<h3>Destinations</h3>);
    const optTitle=(<h3>Options</h3>);
    const tripTitle=(<h3>Trip</h3>);
    const options=this.state.options;
    const destinations=this.state.destinations;
    return(
        <div id="application" className="container">
          <div className="row">
            <div className="col-12">
                <Options options={options} updateOptions={this.updateOptions}/>
            </div>
            <div className="col-12">
                <Destinations destinations={destinations} updateDestinations={this.updateDestinations}/>
            </div>
            <div className="col-12">
                <Trip options={options} destinations={destinations}/>
            </div>
          </div>
        </div>
    )
  }
}

export default Application;