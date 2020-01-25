import React, { Component } from "react";
import { Container } from "reactstrap";

import ServerSettingsModal from "./ServerSettingsModal";

import "./header-footer.css";

export default class Footer extends Component
{

    constructor(props) {
        super(props);
        this.state = {modalOpen: false};
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
        const UNICODE_WARNING = "\u26A0";
        const UNICODE_LINK = "\uD83D\uDD17";
        let UTFchar = UNICODE_WARNING;
        if (this.props.serverSettings.serverConfig && this.props.serverSettings.serverConfig.serverName) {
            serverName = this.props.serverSettings.serverConfig.serverName;
            UTFchar = UNICODE_LINK;
        }
        return (
            <div className="vertical-center tco-text">
                <Container>
                    <div className="centered">
                        {`${UTFchar} Connected to ${serverName} `}
                        <a className="tco-text" onClick={() => this.setState({modalOpen: true})}>
                            ({this.props.serverSettings.serverPort}).
                        </a>
                    {this.renderModal()}
                    </div>
                </Container>
            </div>
        );
    }

    renderModal() {
        return (
            <ServerSettingsModal
                modalOpen={this.state.modalOpen}
                toggleModal={(modalOpen = !this.state.modalOpen) => this.setState({modalOpen: modalOpen})}
                serverSettings={this.props.serverSettings}
                updateServerConfig={this.props.updateServerConfig}
            />
        );
    }
}
