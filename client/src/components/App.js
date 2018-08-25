import React, {Component} from 'react';
import './format.css'
import Header from './Marginals/Header';
import Application from './Application/Application';
import Footer from './Marginals/Footer';
import { HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

require('../pages/site.json')
require('../pages/department.json')

class App extends Component {
  constructor (props){
    super(props);
    this.state = {
      department: {},
      site: {
      "name":"CS 001 Web Page Demonstration",
        "department":"pages/department.json",
        "pages": [
          {"type":"page", "title":"CS 001 Web Pages", "menu":"CS001", "file":"pages/home.md"},
          {"type":"text", "title":"site.json text contents", "menu":"Site", "file":"pages/site.json"},
          {"type":"text", "title":"department.json text contents", "menu":"Dept", "file":"pages/department.json"},
          {"type":"text", "title":"text contents markdown.md", "menu":"Text", "file":"pages/markdown.md"},
          {"type":"page", "title":"page formatted markdown.md", "menu":"Page", "file":"pages/markdown.md"},
          {"type":"card", "title":"card formatted markdown.md", "menu":"Card", "file":"pages/markdown.md"},
          {"type":"card", "title":"Faculty Sample Page", "menu":"Faculty", "file":"pages/faculty.md"},
          {"type":"card", "title":"Course Sample Page", "menu":"Course", "file":"pages/course.md"},
          {"type":"page", "title":"Create your own site", "menu":"Download", "file":"pages/download.md"},
          {"type":"link", "title":"Computer Science", "menu":"CS", "url":"http://www.cs.colostate.edu/"}
        ]
      }
    };
  }

  reactiveRouter(routes) {
    return (
      <Router>
        <div id="App">
          <Header site={this.state.site}/>
          <Route render={({ location }) => (
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
          )}/>
          <Footer/>
        </div>
      </Router>
    )
  }

  render() {
    // Ensure the JSON file contains some elements before attempting to loading.
    if (Object.keys(this.state.site).length > 0) {
      let routes = this.state.site.pages.map((element, index) => {
        let path = (index === 0) ? '/' : '/' + element.menu.replace(/\s+/g, '-').toLowerCase();
        return (
          <Route exact path={path} key={"App_Route_"+index} render={
            () => <Application page={this.state.site.pages[index]}/>}/>
        );
      });
      routes.push( <Redirect to="/" key={"App_Route_" + routes.length + 1}/> );
      return ( <div> { this.reactiveRouter(routes) } </div> )
    }
    else return (<div> Loading ... </div>)
  }
}

export default App;
