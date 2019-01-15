import React, { Component } from 'react'
import { Card, CardHeader, CardBody } from 'reactstrap'
import { Row, Col, Button, ButtonGroup } from 'reactstrap'

export default class Units extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <Card className='text-center'>
          <CardHeader>Units</CardHeader>
          <CardBody>
              <ButtonGroup vertical className='w100'>
                {this.renderUnitButtons(Object.keys(this.props.options.units))}
              </ButtonGroup>
          </CardBody>
      </Card>
    );
  }

  renderUnitButtons(names) {
    return names.sort().map((unit) =>
      <Button
        className='btn-outline-dark unit-button w-100 text-left'
        key={"button_"+unit}
        active={this.props.activeUnit === unit}
        value={unit}
        onClick={(event) => this.props.updateOption('activeUnit', event.target.value)}
      >
        {unit.charAt(0).toUpperCase() + unit.slice(1)}
      </Button>
    );
  }

}