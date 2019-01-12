import React, {Component} from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import './format.css';
import Header from './Marginals/Header';
import Navigation from './Marginals/Navigation';
import Application from './Application/Application';
import Footer from './Marginals/Footer';

export default class App extends Component {
  constructor (props){
    super(props);
    this.pages = [
      { title: 'T00 TripCo', page: ''},
      { title: 'Calculator', page: 'calc'},
      { title: 'Options', page: 'options'},
      { title: '\u2699', page: 'settings' }
    ];

    this.state = {
      current_page: this.pages[0].page
    };

    this.setAppPage = this.setAppPage.bind(this);
  }


  render() {
    return (
      <div className="csu-branding">
        <Header pages={this.pages} setAppPage={this.setAppPage}/>
        <Navigation pages={this.pages} setAppPage={this.setAppPage}/>
        <Application page={this.state.current_page}/>
        <Footer/>
      </div>
    );
  }


  setAppPage (page) {
    this.setState({current_page: page})
  }

}

