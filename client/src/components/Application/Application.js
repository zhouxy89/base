import React, {Component} from 'react'
import { Container } from 'reactstrap'
import Info from './Info'
import Options from './Options/Options'
import Calculator from './Calculator/Calculator'

import { get_config } from '../../api/api'

/* Renders the application.
 * Holds the destinations and options state shared with the trip.
 */
class Application extends Component {
  constructor(props){
    super(props);
    this.state = {
      config: null,
      options: {
        unit: 'miles'
      }
    };

    this.updateConfig = this.updateConfig.bind(this);
    this.updateTrip = this.updateTrip.bind(this);
    this.updateBasedOnResponse = this.updateBasedOnResponse.bind(this);
    this.updateHost = this.updateHost.bind(this);
    this.updateOptions = this.updateOptions.bind(this);

    this.update_functions = {
      updateHost: this.updateHost,
      updateOptions: this.updateOptions
    }
  }

  componentWillMount() {
    this.updateConfig();
  }

  updateConfig() {
    get_config(this.state.hostname).then(
      config => {
        this.setState({
          config: config
        })
      }
    );
  }

  updateHost(hostname) {
    this.setState({hostname});
  }

  updateTrip(field, value){
    let trip = this.state.trip;
    trip[field] = value;
    this.setState(trip);
  }

  updateBasedOnResponse(value) {
    this.setState({'trip': value});
  }

  updateOptions(option, value){
    let temp = this.state;
    if(!temp['options']) { temp['options'] = {}; }   // Define options if undefined
    temp['options']['unit'] = value;
    this.setState(temp);
  }

  render() {
    if(this.state.config)
      switch(this.props.page) {
        case 'calc':
          return <Calculator options={this.state.options}/>;
        case 'options':
          return <Options options={(this.state['options'])?this.state.options:''}
                    config={this.state.config} update_functions={this.update_functions}/>
      }

    return <Info/>
  }
}

export default Application;