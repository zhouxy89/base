import React, {Component} from 'react'
import { Card, CardHeader, CardBody} from 'reactstrap'
import { Button, Input } from 'reactstrap'

export default class Interop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: ''
    }
  }

  render() {
    return (
        <Card className='text-center'>
          <CardHeader>Server</CardHeader>
          <CardBody>
            <form onSubmit={this.updateServerPort.bind(this)}>
              <Input onChange={this.updateInputText.bind(this)}
                     value={this.state.inputText}
                     placeholder={this.props.serverPort}/>
              <br/>
              <Button type='submit' className='btn-dark w-100'>Configure</Button>
            </form>
          </CardBody>
        </Card>
    );
  }

  updateInputText(event) {
    this.setState({inputText: event.target.value})
  }

  updateServerPort(serverPort) {
    serverPort.preventDefault();
    // @todo needs some error checking, like a http://host:port parse
    this.props.updateOption('serverPort', this.state.inputText);
  }

}
