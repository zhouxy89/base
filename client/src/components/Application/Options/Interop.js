import React, {Component} from 'react'
import { Card, CardBody, Col, Row } from 'reactstrap'
import { Button, Input } from 'reactstrap'

export default class Interop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input_text: ''
    }

    this.updateInput = this.updateInput.bind(this);
  }

  updateInput(e) {
    this.setState({input_text: e.target.value})
  }

  render() {
    return (
      <Card>
        <CardBody>
          Change server
          <Row>
              <Col sm='12' md='4'>
                <Input onChange={this.updateInput} value={this.state.input_text}
                  placeholder={this.props.hostname}/>
              </Col>
              <Col>
                <Button onClick={() => this.props.updateOption('hostname', this.state.input_text)}>Update</Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
      );
    }
  }
