import React, {Component} from 'react'
import { Container } from 'reactstrap'
import Info from './Info'
import Options from './Options/Options'
import Calculator from './Calculator/Calculator'

import { get_config, get_hostname } from '../../api/api'

/* Renders the application.
 * Holds the destinations and options state shared with the trip.
 */
class Application extends Component {
  constructor(props){
    super(props);
    this.state = {
      config: null,
      options: {
        unit: 'miles',
        hostname: get_hostname()
      }
    };

    this.updateConfig = this.updateConfig.bind(this);
    this.updateOption = this.updateOption.bind(this);
  }

  componentWillMount() {
    this.updateConfig();
  }

  updateConfig() {
    get_config(this.state.options.hostname).then(
      config => {
        console.log("Successfully retrieved config from", this.state.options.hostname);
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

    if(this.props.page === 'options')
      return <Options options={this.state.options}
                config={this.state.config} updateOption={this.updateOption}/>
    return <Info/>
  }
}

export default Application;