import React, { Component } from "react";
import { Collapse, Container } from "reactstrap";

import "bootstrap/dist/css/bootstrap.css";
import "./tcowebstyle.css";

import Header from "./Margins/Header";
import ErrorBanner from "./ErrorBanner";
import About from "./About/About.js";
import Atlas from "./Atlas/Atlas";
import Footer from "./Margins/Footer";

import { getOriginalServerPort, sendServerRequest } from "../api/restfulAPI";
import { isValid } from "../utils/Utils";
import log from "../utils/globals";
import * as configSchema from "../../schemas/TIPConfigResponseSchema";
import { HTTP_BAD_REQUEST, HTTP_OK } from "./Constants";

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showAbout: false,
            serverConfig: null,
            clientSettings: {serverPort: getOriginalServerPort()},
            errorMessage: null
        };

        this.toggleAbout = this.toggleAbout.bind(this);

        sendServerRequest('config', this.state.clientSettings.serverPort).then(config => {
            this.processConfigResponse(config);
        });
    }

    render() {
        return (
            <div className="csu-branding">
                {this.state.errorMessage}
                <Header toggleAbout={this.toggleAbout}/>
                {this.renderAbout()}
                {this.renderHome()}
                <Footer
                    serverConfig={this.state.serverConfig}
                    clientSettings={this.state.clientSettings}
                    updateServerConfig={(value, config) => this.updateServerConfig(value, config)}
                />
            </div>
        );
    }

    renderAbout() {
        return(
            <Collapse isOpen={this.state.showAbout}>
                <About closePage={this.toggleAbout}/>
            </Collapse>
        );
    }

    renderHome() {
        return (
            <Collapse isOpen={!this.state.showAbout}>
                <Atlas
                    serverConfig={this.state.serverConfig}
                    clientSettings={this.state.clientSettings}
                    modify={(state, value) => this.setState({[state]: value})}
                />
            </Collapse>
        );
    }

    toggleAbout() {
        const newState = !this.state.showAbout;
        this.setState({showAbout: newState});
    }

    updateServerConfig(value, config) {
        this.setState({clientSettings: {serverPort: value}});
        this.processConfigResponse(config);
    }

    processConfigResponse(config) {
        if(!isValid(config.body, configSchema)) {
            this.processServerConfigError("INVALID_RESPONSE", HTTP_BAD_REQUEST, `Configuration response not valid`);
        } else if(config.statusCode === HTTP_OK) {
            log.error("Switching to server ", this.state.clientSettings.serverPort);
            this.setState({serverConfig: config.body});
            this.setState({errorMessage: null});
        } else {
            this.processServerConfigError(config.statusText, config.statusCode, `Failed to fetch config from ${this.state.clientSettings.serverPort}. Please choose a valid server.`);
        }
    }

    processServerConfigError(statusText, statusCode, message) {
        this.setState({serverConfig: null, errorMessage: this.createErrorBanner(statusText, statusCode, message)});

    }

    createErrorBanner(statusText, statusCode, message) {
        return (
            <Container>
                <ErrorBanner statusText={statusText}
                             statusCode={statusCode}
                             message={message}
                />
            </Container>
        );
    }
}

