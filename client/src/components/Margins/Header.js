import React, {Component} from 'react';
import './header-footer.css';
import HeaderLogo from './resources/tcoLogo.svg';
import {teamName} from '../Constants';

export default class Header extends Component {

    render() {
        return (
            <div className="header">
                <div className="application-width">
                    <div className={"header-container"}>
                        <div className="header-wrapper">
                            <a href="https://cs.colostate.edu/~cs314" id="csuHeaderLink" target="_blank">
                                <img id="tcoLogo" src={HeaderLogo} height="100%" alt="TCO Brand Logo"/>
                            </a>
                        </div>
                        <div className="header-wrapper">
                            <a onClick={this.props.toggleAbout}>
                                <h1 className="csu-text-upper">{teamName}</h1>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
