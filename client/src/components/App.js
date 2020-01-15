import React, {Component} from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import './tripcowebstyle.css';

import Header from './Margins/Header';
import Application from './Application/Application';
import Footer from './Margins/Footer/Footer';

import {getOriginalServerPort} from "../utils/restfulAPI";

export default class App extends Component {

  constructor(props) {
    super(props);

    this.pages = [
      { title: 't## team name', page: ''},
      { title: 'Calculator', page: 'calc'},
      { title: 'Options', page: 'options'},
      { title: '\u2699', page: 'settings' }
    ];

    this.state = {
      current_page: this.pages[0].page,
      serverConfig: null,
      clientSettings: {serverPort: getOriginalServerPort()},
    };
  }

  render() {
    return (
      <div className="csu-branding">
        <Header
            pages={this.pages}
            setAppPage={(page) => this.setState({current_page: page})
            }
        />
        <Application
            page={this.state.current_page}
            serverConfig={this.state.serverConfig}
            clientSettings={this.state.clientSettings}
            modify={(state, value) => this.setState({[state]: value})}
        />
        <Footer
          serverConfig={this.state.serverConfig}
          clientSettings={this.state.clientSettings}
        />
      </div>
    );
  }
}

