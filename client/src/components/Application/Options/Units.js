import React, { Component } from 'react'
import { Card, CardHeader, CardBody } from 'reactstrap'
import { Row, Col, Button, ButtonGroup } from 'reactstrap'

export default class Units extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const buttons = this.props.options.units.sort().map((unit) =>
        <Button
          className='btn-outline-dark unit-button w-100 text-left'
          active={this.props.unit === unit}
          value={unit}
          onClick={(event) => this.props.updateOption('unit', event.target.value)}
        >
          {unit.charAt(0).toUpperCase() + unit.slice(1)}
        </Button>

    );
    return(
      <Card className='text-center'>
        <CardHeader>Units</CardHeader>
        <CardBody>
          <ButtonGroup vertical className='w100'>
            {buttons}
          </ButtonGroup>
        </CardBody>
      </Card>
    );
  }
}