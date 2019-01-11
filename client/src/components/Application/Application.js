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

    this.updatePlanOption = this.updatePlanOption.bind(this);
    this.updateClientSetting = this.updateClientSetting.bind(this);
    this.updateServerConfig = this.updateServerConfig.bind(this);

    // @todo which units should we provide?
    this.state = {
      serverConfig: null,
      planOptions: {
        units: {'miles':3959, 'kilometers':6371},
        unit: 'miles'
      },
      clientSettings: {
        serverPort: getOriginalServerPort()
      }
    };

    this.updateServerConfig();
  }

  render() {
    let pageToRender = (!this.state.serverConfig) ? '' : this.props.page;

    switch(pageToRender) {
      case 'calc':
        return <Calculator options={this.state.planOptions}
                           settings={this.state.clientSettings}/>;
      case 'options':
        return <Options options={this.state.planOptions}
                        config={this.state.serverConfig}
                        updateOption={this.updatePlanOption}/>;
      case 'settings':
        return <Settings settings={this.state.clientSettings}
                         updateSetting={this.updateClientSetting}/>;
      default:
        return <Home/>;
    }
  }

  updateClientSetting(field, value) {
    if(field === 'serverPort')
      this.setState({clientSettings: {serverPort: value}}, this.updateServerConfig);
    else {
      let newSettings = Object.assign({}, this.state.planOptions);
      newSettings[field] = value;
      this.setState({clientSettings: newSettings});
    }
  }

  updatePlanOption(option, value) {
    let optionsCopy = Object.assign({}, this.state.planOptions);
    optionsCopy[option] = value;
    this.setState({'planOptions': optionsCopy});
  }

  updateServerConfig() {
    sendHttpGetRequest('config', this.state.clientSettings.serverPort)
      .then(config => {
          console.log("Switch to server ", this.state.clientSettings.serverPort);
          console.log(config);
          this.setState({serverConfig: config});
        }
      );
  }

}
