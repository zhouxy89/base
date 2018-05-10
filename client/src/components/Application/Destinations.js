import React, {Component} from 'react'
import { Card, CardHeader, CardBody } from 'reactstrap'
import { Input } from 'reactstrap'

/* Destinations reside in the parent object so they may be shared
 * with the Trip object.
 * Renders the current destination list.
 * Loads destinations from files.
 * Finds destinations in a database.
 * Displays the current number of destinations
 */
class Destinations extends Component {
  constructor(props) {
    super(props);
    this.loadTrip = this.loadTrip.bind(this);
  }

  loadTrip(event) {
    console.log(event.target.files[0].name);
    // now you need to read the file and create a JSON.
    // then you need to set the trip property
    // this.props.updateTrip(??);
  }

  render() {
    // need to clean up the button
    const count = 99; // need to count the number in the trip
    return (
      <Card id="Destinations">
        <CardHeader className={'bg-info text-white'}>
          Destinations
        </CardHeader>
        <CardBody>
          <p>Load destinations from a file.</p>
          <Input type="file" onChange={this.loadTrip}/>
          <h5>There are {count} destinations. </h5>
        </CardBody>
      </Card>
    )
  }
}

export default Destinations;