import React, {Component} from 'react'
import { Card, CardHeader, CardBody } from 'reactstrap'
import { ButtonGroup, Button } from 'reactstrap'

/* Options allows the user to change the parameters for planning
 * and rendering the trip map and itinerary.
 * The options reside in the parent object so they may be shared with the Trip object.
 * Allows the user to set the options used by the application via a set of buttons.
 */
class Options extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    const buttons = ['Miles', 'Kilometers'].map((unit) =>
      <Button
        key={'distance_button_' + unit}
        className='btn-outline-dark'
        active={this.props.options.distance === unit}
        value={unit}
        onClick={(event) => this.props.updateOptions('distance', event.target.value)}
      >
        {unit}
      </Button>
    );

    return(
      <Card>
        <CardHeader className="bg-info text-white">
          Options
        </CardHeader>
        <CardBody>
          <p>Highlight the options you wish to use.</p>
          <ButtonGroup>
            {buttons}
          </ButtonGroup>
        </CardBody>
      </Card>
    )
  }
}

export default Options;