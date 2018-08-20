import React, {Component} from 'react';
import { Jumbotron, Media } from 'reactstrap';

/* Renders a text heading above the application with useful information.
 */
class Header extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <Jumbotron fluid>
          {this.title()}
          <p className="lead">"Want to travel far and wide?"</p>
            <ol >
              <li>
                Choose options for trip planning, information to display about locations,
                and how the trip map and itinerary should be saved.</li>
              <li>
                Choose your destinations by loading existing sets of destinations or
                find more in an extensive database of locations worldwide.</li>
              <li>
                Plan the trip with the options you selected.
                Review and revise the trip origin and order.
                Save the trip map and itinerary for future reference.</li>
            </ol>
          </Jumbotron>
      </div>
    )
  }

  title() {
    return(
      <h3>
          <Media object src={require('./images/csu.png')}
                 style={{
                   height: "10%",
                   minHeight: "50px"
                 }}
          />
          TripCo <small id='team-info'>t{this.props.number} {this.props.name}</small>
      </h3> )
  }
}

export default Header;
