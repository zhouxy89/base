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
      site: {},
    };
  }

  componentWillMount() {
    let site = './pages/site.json';
    let siteError = {
      name: "Site configuration error",
      pages: [{title: "Site configuration error"}]
    };
    let error = "";

    fetch(site)
      .then(response => {
        if (response.ok)
          return response.json();
        error = site + " - unable to open (" + response.status + ").";
        console.error(error);
        console.log(response);
        return siteError;
      })
      .then(data => {
        this.setState({
          site: data,
        });
        this.fetchDepartmentInfo(data.department, error, site);
      })
      .catch(err => {
        error = site + " - file error.";
        console.error(error);
        console.log(err);
        this.setState({site : siteError});
      });
  }

  fetchDepartmentInfo(department, error, site) {
    let departmentError = {
      nameLong: "Department configuration error",
      name: "Department configuration error"
    };
    if (!error) {
      fetch(department)
        .then(response => {
          if (response.ok)
            return response.json();
          error = department + " - unable to open (" + response.status + ").";
          console.error(error);
          console.log(response);
          return departmentError;
        })
        .then(data => {
          this.setState({department : data});
        })
        .catch(err => {
          error = "department.json - file error.";
          console.error(error);
          console.log(err);
          this.setState({department : departmentError});
        })
    }
    else {
      error = "Unable to load department configuration from " + site;
      departmentError = {
        nameLong: "Department configuration error - Unable to load from " + site,
        name: "Department configuration error - Unable to load from " + site
      };
      console.error(error);
      this.setState({department: departmentError});
    }
  }

  reactiveRouter(routes) {
    return (
      <Router>
        <div id="App">
          <Header site={this.state.site} department={this.state.department}/>
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
          <Footer department={this.state.department}/>
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
