import React, {Component} from 'react';
import {Container} from 'reactstrap'

import ServerSettingsModal from './ServerSettingsModal'

import './header-footer.css';

export default class Footer extends Component {

    constructor(props) {
        super(props);
        this.state = {modalOpen: false}
    }

    render() {
        return (
            <div className="full-width footer">
                {this.renderServerInformation()}
            </div>
        )
    }

    renderServerInformation() {
        let serverName = "Unknown";
        let UTFchar = "\u26A0"; // Warning Unicode Character
        if (this.props.serverConfig && this.props.serverConfig.serverName) {
            serverName = this.props.serverConfig.serverName;
            UTFchar = "\uD83D\uDD17"; // Link Unicode Character
        }
        return (
            <div className="vertical-center tco-text">
                <Container>
                    <div className="centered">
                        {`${UTFchar} Connected to ${serverName} `}
                        <a className="tco-text" onClick={() => this.setState({modalOpen: true})}>
                            ({this.props.clientSettings.serverPort}).
                        </a>
                        <ServerSettingsModal
                            modalOpen={this.state.modalOpen}
                            serverConfig={this.props.serverConfig}
                            clientSettings={this.props.clientSettings}
                            toggleModal={(modalOpen = !this.state.modalOpen) => this.setState({modalOpen: modalOpen})}
                            updateServerConfig={this.props.updateServerConfig}
                        />
                    </div>
                </Container>
            </div>
        );
    }
}
