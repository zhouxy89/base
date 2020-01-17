import React, {Component} from 'react';
import {Button} from 'reactstrap'

import ServerSettingsModal from './ServerSettingsModal'

import './header-footer.css';

export default class Footer extends Component {

    constructor(props) {
        super(props);
        this.state = {modalOpen: false}
    }

    render() {
        return (
            <div className="footer">
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
            <div className={"footer-container"}>
                {UTFchar} Connected to {serverName}
                <Button color="#1E4D2B"
                        onClick={() => this.setState({modalOpen: true})}
                >
                    <div className={"tco-text"}>
                        ( {this.props.clientSettings.serverPort} ).
                    </div>
                </Button>
                <ServerSettingsModal
                    modalOpen={this.state.modalOpen}
                    toggleModal={(modalOpen = !this.state.modalOpen) => this.setState({modalOpen: modalOpen})}
                    serverConfig={this.props.serverConfig}
                    clientSettings={this.props.clientSettings}
                    updateServerConfig={this.props.updateServerConfig}
                />
            </div>
        );
    }
}
