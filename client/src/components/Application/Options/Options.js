import React, {Component} from 'react'
import {Container, Row, Col, Card, CardHeader, CardBody} from 'reactstrap'

import Units from './Units'

/* Options allows the user to change the parameters for planning
 * and rendering the trip map and itinerary.
 * The options reside in the parent object so they may be shared with the Distance object.
 * Allows the user to set the options used by the application via a set of buttons.
 */
export default class Options extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    return(
        <Container>
          <Row>
            <Col xs="12">
              {this.heading()}
            </Col>
          </Row>
          <Row>
            <Col xs="12" sm="12" md="6" lg="4" xl="3">
              <Units options={this.props.options}
                     unit={this.props.options.unit}
                     updateOption={this.props.updateOption}/>
            </Col>
          </Row>
        </Container>
    )
  }


  heading() {
    return (
        <Card>
          <CardHeader className='bg-csu-green text-white font-weight-bold'>Options</CardHeader>
          <CardBody>Select ...</CardBody>
        </Card>
    );
  }

}
