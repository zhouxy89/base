import React, { Component } from "react";
import { Container } from "reactstrap";

import ServerSettings from "./ServerSettings";

import "./header-footer.css";

const UNICODE_WARNING_SIGN = "\u26A0";
const UNICODE_LINK_SYMBOL = "\uD83D\uDD17";

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
        const serverName = this.getServerNameFromConnectionStatus();
        const linkStatusCharacter = this.getCharFromConnectionStatus();
        return (
            <div className="vertical-center tco-text">
                <Container>
                    <div className="centered">
                        {`${linkStatusCharacter} Connected to ${serverName} `}
                        <a className="tco-text" onClick={() => this.setState({modalOpen: true})}>
                            ({this.props.clientSettings.serverPort}).
                        </a>
                    {this.renderServerSettings()}
                    </div>
                </Container>
            </div>
        );
    }

    getCharFromConnectionStatus() {
        return this.connectedToValidServer() ? UNICODE_LINK_SYMBOL : UNICODE_WARNING_SIGN;
    }

    getServerNameFromConnectionStatus() {
        return this.connectedToValidServer() ? this.props.serverConfig.serverName : "Unknown";

    }

    connectedToValidServer() {
        return this.props.serverConfig && this.props.serverConfig.serverName;
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
