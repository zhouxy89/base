import React, {Component} from 'react';
import { Container } from 'reactstrap';

import Home from './Home';
import Options from './Options/Options';
import Calculator from './Calculator/Calculator';
import Settings from './Settings/Settings';
import {getOriginalServerPort, sendHttpGetRequest} from '../../api/restfulAPI';


/* Renders the application.
 * Holds the destinations and options state shared with the trip.
 */
export default class Application extends Component {
  constructor(props){
    super(props);

    this.updateOption = this.updateOption.bind(this);
    this.updateSetting = this.updateSetting.bind(this);
    this.updateConfig = this.updateConfig.bind(this);

    // @todo which units should we provide?
    this.state = {
      serverConfig: null,
      options: {
        units: {'miles':3959, 'kilometers':6371},
        unit: 'miles'
      },
      settings: {
        serverPort: getOriginalServerPort()
      }
    };

    this.updateConfig();
  }

  render() {
    let pageToRender = (!this.state.serverConfig) ? '' : this.props.page;

    switch(pageToRender) {
      case 'calc':
        return <Calculator options={this.state.options} settings={this.state.settings}/>;
      case 'options':
        return <Options options={this.state.options}
                        config={this.state.serverConfig}
                        updateOption={this.updateOption}/>;
      case 'settings':
        return <Settings settings={this.state.settings}
                         updateSetting={this.updateSetting}/>;
      default:
        return <Home/>;
    }
  }

  updateSetting(field, value) {
    if(field === 'serverPort')
      this.setState({settings: {serverPort: value}}, this.updateConfig);
    else {
      let newSettings = Object.assign({}, this.state.options);
      newSettings[field] = value;
      this.setState({settings: newSettings});
    }
  }

  updateOption(option, value) {
    let optionsCopy = Object.assign({}, this.state.options);
    optionsCopy[option] = value;
    this.setState({'options': optionsCopy});
  }

  updateConfig() {
    sendHttpGetRequest('config', this.state.settings.serverPort)
      .then(config => {
          console.log("Switch to server ", this.state.settings.serverPort);
          console.log(config);
          this.setState({serverConfig: config});
        }
      );
  }

}
