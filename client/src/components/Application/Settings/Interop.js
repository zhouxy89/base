import React, {Component} from 'react'
import { Card, CardHeader, CardBody} from 'reactstrap'
import { Button, Input } from 'reactstrap'

export default class Interop extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputText: ''
    };

    this.updateServerPort = this.updateServerPort.bind(this);
    this.updateInputText = this.updateInputText.bind(this);
  }

  render() {
    if (this.props.serverConfig) {
      var currentServerName = this.props.serverConfig.serverName;
    }
    return (
        <Card>
          <CardHeader className='bg-csu-gold text-white font-weight-semibold'>Server</CardHeader>
          <CardBody>
            <p> Current server name: {currentServerName} </p>
            <p>Configure new server:</p>
            <form onSubmit={this.updateServerPort}>
              <Input onChange={this.updateInputText}
                     value={this.state.inputText}
                     placeholder={this.props.serverPort}/>
              <br/>
              <Button type='submit' className='btn-csu w-100'>Configure</Button>
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
    this.props.updateSetting('serverPort', this.state.inputText);
  }

}
