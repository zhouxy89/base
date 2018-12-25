import React, {Component} from 'react'
import { Container } from 'reactstrap'
import Home from './Home'
import Options from './Options/Options'
import Calculator from './Calculator/Calculator'

import {getOriginalServerPort, sendHttpGetRequest} from '../../api/restfulAPI'


/* Renders the application.
 * Holds the destinations and options state shared with the trip.
 */
class Application extends Component {
  constructor(props){
    super(props);
    this.state = {
      config: null,
      options: {
        units: ['kilometers','miles','nautical miles'],
        unit: 'miles',
        serverPort: getOriginalServerPort()
      }
    };

    this.updateConfig = this.updateConfig.bind(this);
    this.updateOption = this.updateOption.bind(this);
  }

  componentWillMount() {
    this.updateConfig();
  }

  updateConfig() {
    sendHttpGetRequest('config', this.state.options.serverPort).then(
      config => {
        console.log("Successfully retrieved config from", this.state.options.serverPort);
        console.log(config);
        this.setState({
          config: config
        })
      }
    );
  }

  updateOption(key, value) {
    let temp = Object.assign({}, this.state.options);
    temp[key] = value;
    if(key === 'hostname')
      this.setState({'options': temp}, () => this.updateConfig());
    else
      this.setState({'options': temp});
  }

  render() {
    if(this.state.config)
      switch(this.props.page) {
        case 'calc':
          return <Calculator options={this.state.options}/>;
      }

    switch(this.props.page) {
      case 'options':
        return <Options options={this.state.options}
                  config={this.state.config} updateOption={this.updateOption}/>
      default:
        return <Home/>
    }
  }
}

export default Application;