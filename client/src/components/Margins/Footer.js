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
                <div className="application-width">
                    {this.renderServerInformation()}
                </div>
            </div>
        )
    }

    renderServerInformation() {
        let serverName = "Unknown";
        if (this.props.serverConfig && this.props.serverConfig.serverName) {
            serverName = this.props.serverConfig.serverName;
        }
        return (
            <div className={"footer-container"}>
                &#128279; Connected to {serverName}
                <Button color="#1E4D2B"
                        onClick={() => this.setState({modalOpen: true})}
                >
                    <div className={"csu-text"}>
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
