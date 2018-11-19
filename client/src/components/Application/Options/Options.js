import React, {Component} from 'react'
import {Container, Card, CardHeader, CardBody} from 'reactstrap'
import { ButtonGroup, Button } from 'reactstrap'
import Units from './Units'
import Interop from './Interop'

/* Options allows the user to change the parameters for planning
 * and rendering the trip map and itinerary.
 * The options reside in the parent object so they may be shared with the Distance object.
 * Allows the user to set the options used by the application via a set of buttons.
 */
class Options extends Component{
  constructor(props) {
    super(props);
  }

  render() {

    return(
      <Container>
          {this.props.config != null &&
            <Units config={this.props.config}
              unit={this.props.options.unit} updateOption={this.props.updateOption}/>
          }
          <Interop hostname={this.props.options.hostname} updateOption={this.props.updateOption}/>
      </Container>
    )
  }
}

export default Options;