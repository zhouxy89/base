import React, {Component} from 'react';
import {Container, Row, Col, Card, CardHeader, CardBody} from 'reactstrap';
import Interop from './Interop';

/**
 * The Settings component.
 * This component is responsible for managing global client settings, such as
 * the server and default options.
 */
export default class Settings extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Row>
          <Col xs="12">
            {this.heading()}
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="12" md="6" lg="4" xl="3">
            <Interop serverPort={this.props.settings.serverPort}
                     updateSetting={this.props.updateSetting}/>
          </Col>
        </Row>
      </Container>
    );
  }


  heading() {
    return (
        <Card>
          <CardHeader className='bg-csu-green text-white font-weight-bold'>Settings</CardHeader>
          <CardBody>Change global client settings...</CardBody>
        </Card>
    );
  }

}
