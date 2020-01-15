import React, {Component} from 'react';

import Home from './Home';

/* Renders the application.
 * Holds the destinations and options state shared with the trip.
 */
export default class Application extends Component {
  constructor(props){
    super(props);

    this.updatePlanOption = this.updatePlanOption.bind(this);
    this.updateClientSetting = this.updateClientSetting.bind(this);
    this.createApplicationPage = this.createApplicationPage.bind(this);

    this.state = {
      planOptions: {units: {'miles': 3959}, activeUnit: 'miles'},
    };
  }

  render() {
    let pageToRender = this.state.serverConfig ? this.props.page : 'settings';

    return (
      <div className='application-width'>
        {this.props.errorMessage}{this.createApplicationPage(pageToRender)}
      </div>
    );
  }

  updateClientSetting(field, value) {
      let newSettings = Object.assign({}, this.state.planOptions);
    newSettings[field] = value;
    this.props.modify('clientSettings', newSettings);
  }

  updatePlanOption(option, value) {
    let optionsCopy = Object.assign({}, this.state.planOptions);
    optionsCopy[option] = value;
    this.setState({'planOptions': optionsCopy});
  }

  createApplicationPage() {
    return <Home/>;
  }
}
