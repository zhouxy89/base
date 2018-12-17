import React, {Component} from 'react';
import './css/marginals.css';
import Navigation from "./Navigation";
import {HeaderLogoLarge, HeaderLogoMedium, HeaderLogoSmall} from './HeaderLogo';

/* Renders a text heading above the application with useful information.
 */
class Header extends Component{
  constructor(props) {
    super(props);
  }

  topLevelHeader() {
    return (
      <div className="add-header-height">
        <div className="application-width">
          <div id="responsiveHeaderContainer">

            <a href="http://colostate.edu" id="csuHeaderLink" target="_blank">
              <HeaderLogoLarge/>
              <HeaderLogoMedium/>
              <HeaderLogoSmall/>
            </a>
            <div id="responsiveLogoSubsystem">
              <a href={"https://compsci.colostate.edu/"} id="csHeaderLink" target="_blank">
                <h1 className="larger-CSUtext-upper">
                  Computer Science
                </h1>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /**
   *
   * @returns {XML}
   */
  render() {
    return(
      <div>
        {this.topLevelHeader()}
        <Navigation pages={this.props.pages} page_handler={this.props.page_handler}/>
        <div className="add-title"/> {/* Background box to header */}
      </div>
    );
  }

}

export default Header;