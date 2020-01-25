import React, { Component } from "react";
import { Container } from "reactstrap";

import ServerSettings from "./ServerSettings";

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
        if (this.props.serverConfig && this.props.serverConfig.serverName) {
            serverName = this.props.serverConfig.serverName;
            UTFchar = UNICODE_LINK;
        }
        return (
            <div className="vertical-center tco-text">
                <Container>
                    <div className="centered">
                        {`${UTFchar} Connected to ${serverName} `}
                        <a className="tco-text" onClick={() => this.setState({modalOpen: true})}>
                            ({this.props.clientSettings.serverPort}).
                        </a>
                    {this.renderServerSettings()}
                    </div>
                </Container>
            </div>
        );
    }

    renderServerSettings() {
        return (
            <ServerSettings
                modalOpen={this.state.modalOpen}
                toggleModal={(modalOpen = !this.state.modalOpen) => this.setState({modalOpen: modalOpen})}
                serverConfig={this.props.serverConfig}
                clientSettings={this.props.clientSettings}
                updateServerConfig={this.props.updateServerConfig}
            />
        );
    }
}
