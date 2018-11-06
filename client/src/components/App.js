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
      { title: 'T00 TripCo', page: 'home', link: '/'},
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

  reactiveRouter(routes) {
    return (
        <div id="App">
          <Route render={({ location }) => (
            <div>
              <Header pages={this.pages}/>
              <TransitionGroup>
                <CSSTransition
                  key={location.pathname}
                  appear
                  timeout={{enter:900, exit:0}}
                  classNames='pagefade'
                >
                  <Switch location={location}>
                    {routes}
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
              <Footer/>
            </div>
          )}/>
        </div>
    )
  }

  render() {
    const routes = this.pages.map( (element) =>
        <Route exact path={element['link']} key={"route_".concat(element['page'])}
          render={() => <Application page={element['page']}/>}/>
      );
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
