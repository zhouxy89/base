import React, {Component} from 'react'
import { Card, CardBody, Col, Row } from 'reactstrap'
import { Button, Input } from 'reactstrap'

export default class Interop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input_text: ''
    }
  }

  updateInput(e) {
    this.setState({input_text: e.target.value})
  }

  render() {
    return (
      <Card>
        <CardBody>
          Change server
          <form onSubmit={(e) => {
              e.preventDefault();
              this.props.updateOption('hostname', this.state.input_text);
            }}>
            <Row>
              <Col sm='12' md='4'>
                <Input onChange={this.updateInput.bind(this)} value={this.state.input_text}
                  placeholder={this.props.hostname}/>
              </Col>
              <Col>
                <Button type='submit'>Update</Button>
              </Col>
            </Row>
           </form>
          </CardBody>
        </Card>
      );
    }
  }
