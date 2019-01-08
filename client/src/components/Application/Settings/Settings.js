import React, {Component} from 'react';
import {Container, Row, Col, Card, CardHeader, CardBody} from 'reactstrap';
import Interop from '../Options/Interop';

/**
 * The Settings component.
 * This component is responsible for managing global client settings, such as
 * interop server and default settings.
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
            <Card>
              <CardHeader>Settings</CardHeader>
              <CardBody>Change global client settings...</CardBody>
            </Card>
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
}
