import React, { Component } from 'react'
import { Card, CardBody } from 'reactstrap'
import { Button, ButtonGroup } from 'reactstrap'

export default class Units extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const buttons = this.props.config.units.map((unit) =>
      <Button
        key={'distance_button_' + unit}
        className='btn-outline-dark unit-button'
        active={this.props.unit === unit}
        value={unit}
        onClick={(event) => this.props.updateOption('unit', event.target.value)}
      >
        {unit.charAt(0).toUpperCase() + unit.slice(1)}
      </Button>
    );
    return(
      <Card>
        <CardBody>
          <p>Select the options you wish to use.</p>
          <ButtonGroup>
            {buttons}
          </ButtonGroup>
        </CardBody>
      </Card>
    );
  }
}