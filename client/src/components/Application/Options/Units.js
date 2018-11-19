import React, { Component } from 'react'
import { Card, CardBody } from 'reactstrap'
import { Row, Col, Button, ButtonGroup } from 'reactstrap'

export default class Units extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const buttons = this.props.config.units.map((unit) =>
      <Col md='3'
        className='p-0'
        key={'distance_button_' + unit}
      >
        <Button
          className='btn-outline-dark unit-button w-100'
          active={this.props.unit === unit}
          value={unit}
          onClick={(event) => this.props.updateOption('unit', event.target.value)}
        >
          {unit.charAt(0).toUpperCase() + unit.slice(1)}
        </Button>
      </Col>
    );
    return(
      <Card>
        <CardBody>
          <p>Select the options you wish to use.</p>
          <Row>
            {buttons}
          </Row>
        </CardBody>
      </Card>
    );
  }
}