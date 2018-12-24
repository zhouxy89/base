import React, {Component} from 'react';
import './format.css'
import Header from './Marginals/Header';
import Application from './Application/Application';
import Footer from './Marginals/Footer';
import { HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

class App extends Component {
  constructor (props){
    super(props);
    this.pages = [
      { title: 'T00 TripCo', page: '', link: '/'},
      { title: 'Calculator', page: 'calc', link: '/calculator'},
      { title: 'Options', page: 'options', link: '/options' }
    ]

    this.state = {
      current_page: this.pages[0].page
    }

    this.page_handler = this.page_handler.bind(this);
  }

  page_handler (page) {
    this.setState({current_page: page})
  }

  render() {
    return (
      <div>
        <Header pages={this.pages} page_handler={this.page_handler}/>
        <Application page={this.state.current_page}/>
        <Footer/>
      </div>
    );
  }
}

export default App;