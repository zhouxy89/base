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
      tableInfo.headers.push(<td key={'headers_'+index}>{places[index].name}</td>);
      tableInfo.distances.push(<td key={'distances_'+index}>{distances[index]}</td>);
    }

    const table = (
      <Table responsive>
        <thead>
          <tr className="table-info">
            <th className="align-middle">Destination</th>
            {tableInfo.headers}
          </tr>
        </thead>
        <tbody>
          <tr>
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
