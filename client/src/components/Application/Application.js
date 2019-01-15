import React, {Component} from 'react';
import { Container } from 'reactstrap';

import Home from './Home';
import Options from './Options/Options';
import Calculator from './Calculator/Calculator';
import Settings from './Settings/Settings';
import {getOriginalServerPort, sendServerRequest} from '../../api/restfulAPI';
import ErrorBanner from './ErrorBanner';


/* Renders the application.
 * Holds the destinations and options state shared with the trip.
 */
export default class Application extends Component {
  constructor(props){
    super(props);

    this.updatePlanOption = this.updatePlanOption.bind(this);
    this.updateClientSetting = this.updateClientSetting.bind(this);

    // @todo which units should we provide?
    this.state = {
      serverConfig: null,
      planOptions: {
        units: {'miles':3959, 'kilometers':6371},
        unit: 'miles'
      },
      clientSettings: {
        serverPort: getOriginalServerPort()
      },
      errorMessage: null
    };

    this.updateServerConfig();
  }

  render() {
    let pageToRender = this.state.serverConfig ? this.props.page : 'settings';

    switch(pageToRender) {
      case 'calc':
        pageToRender = <Calculator options={this.state.planOptions}
                                   settings={this.state.clientSettings}/>;
        break;
      case 'options':
        pageToRender = <Options options={this.state.planOptions}
                                config={this.state.serverConfig}
                                updateOption={this.updatePlanOption}/>;
        break;
      case 'settings':
        pageToRender = <Settings settings={this.state.clientSettings}
                                 updateSetting={this.updateClientSetting}/>;
        break;
      default:
        pageToRender = <Home/>;
    }

    return (
      <div className='application-width'>
        { this.state.errorMessage }
        { pageToRender }
      </div>
    );
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
    sendServerRequest('config', this.state.clientSettings.serverPort).then(config => {
      console.log(config);
      this.processConfigResponse(config);
    });
  }

  processConfigResponse(config) {
    if(config.statusCode >= 200 && config.statusCode <= 299) {
      console.log("Switching to server ", this.state.clientSettings.serverPort);
      this.setState({
        serverConfig: config.body,
        errorMessage: null
      });
    }
    else {
      this.setState({
        serverConfig: null,
        errorMessage: <ErrorBanner title={ `Error fetching config:  ` }
        message={ `Status code: ${ config.statusCode }` } />
      });
    }
  }
}
