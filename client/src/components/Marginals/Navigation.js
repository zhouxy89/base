import React, {Component} from 'react';
import {Collapse, Navbar, NavbarBrand, Nav, NavItem, NavLink as ReactNavLink, Button} from 'reactstrap';
import { NavLink } from 'react-router-dom'
import './css/navbar.css'
import 'bootstrap/dist/css/bootstrap.css'

class Navigation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      window_width: window.innerWidth
    };

    this.toggle = this.toggle.bind(this);
    this.getToggler = this.getToggler.bind(this);
    this.renderNavItem = this.renderNavItem.bind(this);

    this.static_links = this.static_links.bind(this);
    this.collapsible_links = this.collapsible_links.bind(this);
    this.windowSizeChange = this.windowSizeChange.bind(this);
  }

  componentWillMount() {
    window.addEventListener('resize', this.windowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.windowSizeChange);
  }

  windowSizeChange() {
    this.setState({window_width:window.innerWidth});
  };

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  getToggler(){
    if (!this.state.isOpen)return (<div>&#x2630;</div>);
    else return (<div>&#x268A;</div>);
  }

  /**
   * Renders the mobile navigation bar.  This will also update the webpage title
   *      to the correct heading.  The "homepage" has a different name than the
   * @param title of the nav bar item.
   * @param link web page to direct to
   * @returns {XML} of the nav bar item.
   */
  renderNavItem(info, type) {
    const style = (type === 'static') ? 'nav_item' : 'dropdown_item';

    let navLink = (
        <Button color='link' id='bs-override' key={type.concat(info['title'])} to={info['link']} className={style.concat(" nav-link")}>
                 <div onClick={(e) => {this.toggle(); this.props.page_handler(info['page']);}}>{info['title']}</div>
        </Button>
      );
    return ( navLink );
  }

  collapsible_links(){
    let toggler = this.getToggler();
    let links = this.props.pages.map((item) => this.renderNavItem(item, 'dropdown'));

    return(
      <div>
        <Navbar className="nav_side_bar" light>
          <Button id="bs-override" className="dropdown_icon" onClick={this.toggle}> {toggler}</Button>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar>
              {links}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }

  static_links() {
    const home = (
        <Button color="link" id='bs-override' key="static_home" className='nav_title nav-link' onClick={()=>this.props.page_handler('home')}>
          {((this.props.pages) ? this.props.pages[0] : {title: 'Default Home', link: ''})['title']}
        </Button>
      )
    const links = this.props.pages.slice(1).map((item) => this.renderNavItem(item, 'static'));

    return (
      <Navbar id='bs-override' className="nav_bar">
        {home}
        <div>
          {links.reverse()}
        </div>
      </Navbar>
    )
  }

  render() {
    let width = this.state.window_width;
    if (width < 768 ) {
      const c_links = this.collapsible_links();
      return (
      <div className="application-width">
        {c_links}
      </div>
      )
    }
    else {
      const s_links = this.static_links();
      return(
        <div className="application-width">
          {s_links}
        </div>
      )
    }
  }

}

export default Navigation;