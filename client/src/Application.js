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
      options: { // default options - hardcoded for now.
        units:"miles"
      },
      trip: null // a tffi object
    }
    this.updateTrip = this.updateTrip.bind(this);
    this.updateOptions = this.updateOptions.bind(this);
  }

  updateTrip(tffi){
    console.log("updateTrip");
    console.log(tffi);
    this.setState({trip:tffi});
  }

  updateOptions(tffi){
    console.log(tffi);
    this.setState({options: tffi}); // need to extract trip
  }

  render() {
    //const options=this.state.options;
    //const trip=this.state.trip;
    return(
        <div id="application" className="container">
          <div className="row">
            <div className="col-12">
                <Options options={this.state.options} updateOptions={this.updateOptions}/>
            </div>
            <div className="col-12">
                <Destinations trip={this.state.trip} updateTrip={this.updateTrip}/>
            </div>
            <div className="col-12">
                <Trip options={this.state.options} trip={this.state.trip} updateTrip={this.updateTrip} />
            </div>
          </div>
        </div>
    )
  }
}

export default Application;