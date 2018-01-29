import React, {Component} from 'react';

class Itinerary extends Component {
  constructor(props) {
    super(props);
    this.state={
      itinerary: this.props.itinerary,
      options: this.props.options
    }
  }

  render() {
    const distance=99;
    const units="miles";
    const names=[];
    return(
        <div id="itinerary">
          <h4>Round trip distance of {distance} {units}. </h4>
          <table className="table table-responsive table-bordered">
            <thead>
            <tr className="table-info">
              <th className="align-middle">Destination</th>
              {this.state.itinerary[0].map((item) => <td>{item}</td>)}
            </tr>
            </thead>
            <tbody>
            <tr>
              <th className="table-info align-middle">Location</th>
              {this.state.itinerary[1].map((item) => <td>{item}</td>)}
            </tr>
            <tr>
              <th className="table-info align-middle">Miles</th>
              {this.state.itinerary[2].map((item) => <td>{item}</td>)}
            </tr>
            </tbody>
          </table>
        </div>
    )
  }
}

export default Itinerary;
