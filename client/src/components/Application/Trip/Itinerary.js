import React, {Component} from 'react'
import { Container, Table } from 'reactstrap'

class Itinerary extends Component {
  constructor(props) {
    super(props);

    this.createTable = this.createTable.bind(this);
  }

  createTable () {
    let totalDistance = 0;  // TODO Need to sum this from real the trip
    const places = this.props.trip.places;
    const distances = this.props.trip.distances;

    let tableInfo = {headers: [], distances: []};
    for(let index in places) {
      let headerKey = 'headers_'+index;
      let distanceKey = 'distance_'+index;
      tableInfo.headers.push(<td key={headerKey} id={headerKey}>{places[index].name}</td>);
      tableInfo.distances.push(<td key={distanceKey} id={distanceKey}>{distances[index]}</td>);
    }

    const table = (
      <Table responsive>
        <thead>
          <tr id="destnames" className="table-info">
            <th className="align-middle">Destination</th>
            {tableInfo.headers}
          </tr>
        </thead>
        <tbody>
          <tr id="distances">
            <th className="table-info align-middle">{this.props.trip.options.distance}</th>
            {tableInfo.distances}
          </tr>
        </tbody>
      </Table>
    )

    return {totalDistance, table};
  }

  render() {
    let parsed = this.createTable();

    return(
      <Container id="Itinerary">
        <h4>Round trip distance of {parsed.totalDistance} {this.props.trip.options.distance}. </h4>
        {parsed.table}
      </Container>
    )
  }
}

export default Itinerary;
