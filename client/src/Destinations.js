import React, {Component} from 'react';

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
    this.loadFile = this.loadFile.bind(this);
  }

  loadFile(arg) {
    console.log(arg);
    this.updateDestinations(arg);
  }

  render() {
    return (
        <div id="destinations" className="card">
          <div className="card-header bg-info text-white">
            Destinations
          </div>
          <div className="card-body">
            <p>Load destinations from a file.</p>
            <div className="input-group" role="group">
              <span className="input-group-btn">
                <button className="btn btn-primary" type="file"
                        onChange={(e) => this.loadFile(e.target.files)}> Load </button>
              </span>
              <p>## destinations. </p>
              <p>{JSON.stringify(this.props.destinations)}</p>
            </div>
          </div>
        </div>
    )
  }
}

export default Destinations;