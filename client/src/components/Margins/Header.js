import React, {Component} from 'react';
import './colostatewebstyle.css';
import HeaderLogo from './resources/tcoLogo.svg';
import QuestionMark from './resources/questionMark.svg';

/* Renders a text heading above the application with useful information.
 */
export default class Header extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    return(
        <div className="add-header-height">
          <div className="application-width">
            <div id="responsiveHeaderContainer">
              <a href="http://colostate.edu" id="csuHeaderLink" target="_blank">
                  <img id="tcoLogo" src={HeaderLogo}
                       height="100%" alt="TCO Brand Logo"/>
              </a>
              <a id="responsiveLogoSubsystem" onClick={this.props.toggleAbout}>
                <h1 className="larger-CSUtext-upper">
                    {"T## Team Name  "}
                    <img id={"questionMark"} src={QuestionMark}
                      height="45%" style={{'position':'relative', 'top':'-2px'}}
                      alt="Information Question Mark" />
                </h1>
              </a>
            </div>
          </div>
        </div>
    );
  }

}
