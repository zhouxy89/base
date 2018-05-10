import React, {Component} from 'react';
import { Container, Media } from 'reactstrap';


/* Map obtains and renders the map for the trip.
 * Might be an SVG or KML contained in the server response.
 */
class Map extends Component {
  constructor(props){
    super(props);
  }

  render() {
   {
      let svgHeader='data:image/svg+xml;charset=UTF-8,';
      let svg = svgHeader + this.props.trip.map;

      return (
        <Media className="img-fluid" object src={svg}/>
      )
    }
  }
}

export default Map;