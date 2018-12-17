import React, {Component} from 'react'
import {Container, Row, Col, Breadcrumb, BreadcrumbItem, Card, CardHeader, CardBody} from 'reactstrap'
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
          <Row>
            <Col xs="12">
              <Card><CardHeader>Options</CardHeader><CardBody>Select ...</CardBody></Card>
            </Col>
          </Row>
          <Row>
            <Col xs="12" sm="12" md="6" lg="4" xl="3">
              {this.props.config != null &&
              <Units config={this.props.config}
                     unit={this.props.options.unit} updateOption={this.props.updateOption}/>
              }
            </Col>
            <Col xs="12" sm="12" md="6" lg="4" xl="3">
              {this.props.config != null &&
              <Units config={this.props.config}
                     unit={this.props.options.unit} updateOption={this.props.updateOption}/>
              }
            </Col>
            <Col xs="12" sm="12" md="6" lg="4" xl="3">
              {this.props.config != null &&
              <Units config={this.props.config}
                     unit={this.props.options.unit} updateOption={this.props.updateOption}/>
              }
            </Col>
            <Col xs="12" sm="12" md="6" lg="4" xl="3">
              <Interop hostname={this.props.options.hostname}
                       updateOption={this.props.updateOption}/>
            </Col>
          </Row>
        </Container>
    )
  }
}

export default Options;