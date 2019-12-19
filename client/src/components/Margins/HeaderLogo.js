import React, {Component} from 'react';
import './colostatewebstyle.css';
import logoSmall from './resources/CSULogoSmall.svg';
import logoMedium from './resources/CSULogoMedium.svg';
import logoLarge from './resources/CSULogoLarge.svg';

/* These classes render the logos for the CSU header.
 */

class HeaderLogoLarge extends Component {
  render() {
    return (
        <img id="csuLargeLogo" src={logoLarge}
             width="350" height="45" alt="Colorado State University"/>
    )
  }
}



class HeaderLogoMedium extends Component {
  render() {
    return (
        <img id="csuMedLogo" src={logoMedium}
            width="172" height="45" alt="Colorado State University"/>
    )
  }
}



class HeaderLogoSmall extends Component {
  render() {
    return (
        <img id="csuSmallLogo" src={logoSmall}
            width="113" height="45" alt="Colorado State University"/>
    )
  }
}



export {HeaderLogoLarge, HeaderLogoMedium, HeaderLogoSmall};
