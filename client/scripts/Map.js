import React, {Component} from 'react';


/* Map obtains and renders the map for the trip.
 * Might be an SVG or KML contained in the server response.
 */
class Map extends Component {
  constructor(props){
    super(props);
    this.state= {
      map: '<svg width="1106" height="480" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><!-- Created with SVG-edit - http://svg-edit.googlecode.com/ --><g> <g id="svg_4"><svg id="svg_1" height="480" width="1106" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg"><g id="svg_2"><title>Layer 1</title><rect fill="#ddffdd" stroke="#000000" stroke-width="4" x="0" y="0" width="1106" height="480" id="svg_3"/></g></svg> </g></g></svg>',
    }
  }

  render() {
    const svgData='data:image/svg+xml;charset=UTF-8,';
    return (
          <figure class="figure" id="map">
            <img src={svgData.concat(this.state.map)}/>
          </figure>
    )
  }
}

export default Map;