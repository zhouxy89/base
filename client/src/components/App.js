import React, {Component} from 'react';
import {Collapse} from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.css';
import './tripcowebstyle.css';
import Header from './Margins/Header';
import Navigation from './Margins/Navigation';
import About from './About/About.js';
import Application from './Application/Application';
import Footer from './Margins/Footer';
import {teamName} from "./Constants";

export default class App extends Component {
  constructor (props){
    super(props);
    this.pages = [
      { title: teamName, page: ''},
      { title: 'Calculator', page: 'calc'},
      { title: 'Options', page: 'options'},
      { title: '\u2699', page: 'settings' }
    ];

    this.state = {
      showAbout: false,
      current_page: this.pages[0].page
    };

    this.setAppPage = this.setAppPage.bind(this);
    this.toggleAbout = this.toggleAbout.bind(this);
  }


  render() {
    return (
      <div className="csu-branding">
        <Header pages={this.pages} toggleAbout={this.toggleAbout}/>
        <Navigation pages={this.pages} setAppPage={this.setAppPage}/>
        <Collapse isOpen={this.state.showAbout}>
            <About closePage={this.toggleAbout}/>
        </Collapse>
        <Collapse isOpen={!this.state.showAbout}>
          <Application page={this.state.current_page}/>
        </Collapse>
        <Footer/>
      </div>
    );
  }

  toggleAbout() {
      const newState = !this.state.showAbout;
      this.setState({showAbout: newState});
  }

  setAppPage (page) {
    this.setState({current_page: page})
  }

}

