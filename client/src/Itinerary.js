import React, {Component} from 'react';

class Itinerary extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let units = this.props.options.units; // need to get from options
    let itinerary = [];
    if (this.props.trip != null)
      itinerary = this.props.trip.places; // need to get this from trip
    let distance = 0;  // need to sum this from real the trip
    let dests = null;
    let dists = null;
    if (itinerary.length > 0) {
      dests = this.props.trip.places.map((item) => <td>{item.name}</td>);
      dists = this.props.trip.distances.map((item) => <td>{item}</td>);
    }
    console.log(this.props.trip);
    return(
        <div id="itinerary">
          <h4>Round trip distance of {distance} {units}. </h4>
          <table className="table table-responsive table-bordered">
            <thead>
            <tr className="table-info">
              <th className="align-middle">Destination</th>
              {dests}
            </tr>
            </thead>
            <tbody>
            <tr>
              <th className="table-info align-middle">{units}</th>
              {dists}
            </tr>
            </tbody>
          </table>
        </div>
    )
  }
}

export default Itinerary;
