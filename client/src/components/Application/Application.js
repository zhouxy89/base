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
        units: {'miles':3959},
        unit: 'miles',
        serverPort: getOriginalServerPort()
      }
    };

    this.updateOption = this.updateOption.bind(this);
    this.updateConfig = this.updateConfig.bind(this);
  }

  componentWillMount() {
    this.updateConfig();
  }

  updateOption(option, value) {
    let optionsCopy = Object.assign({}, this.state.options);
    optionsCopy[option] = value;
    if(option === 'serverPort')
      this.setState({'options': optionsCopy}, () => this.updateConfig());
    else
      this.setState({'options': optionsCopy});
  }

  updateConfig() {
    sendHttpGetRequest('config', this.state.options.serverPort).then(
      config => {
        console.log("Switch to server ", this.state.options.serverPort);
        console.log(config);
        this.setState({config: config});
      }
    );
  }

  render() {
    console.log(this.state.config);
    console.log(this.props.page);
    var pageToRender = !this.state.config ? '' : this.props.page;

    switch(pageToRender) {
      case 'calc':
        return <Calculator options={this.state.options}/>;
      case 'options':
        return <Options options={this.state.options}
                        config={this.state.config}
                        updateOption={this.updateOption}/>;
      default:
        return <Home/>;
    }
  }
}

export default Application;