import React, {Component} from 'react';
import {Container, Collapse} from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.css';
import './tcowebstyle.css';

import Header from './Margins/Header';
import About from './About/About.js';
import Application from './Application/Application';
import Footer from './Margins/Footer';
import ErrorBanner from "./Application/ErrorBanner";

import {getOriginalServerPort, sendServerRequest} from "../api/restfulAPI";
import {isValid} from "../utils/Utils";
import * as configSchema from "../../schemas/TIPConfigResponseSchema";
import {HTTP_OK} from "./Constants";

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
                <Header toggleAbout={this.toggleAbout}/>
                <Collapse isOpen={this.state.showAbout}>
                  <About closePage={this.toggleAbout}/>
                </Collapse>
                <Collapse isOpen={!this.state.showAbout}>
                  <Application
                      serverConfig={this.state.serverConfig}
                      clientSettings={this.state.clientSettings}
                      errorMessage={this.state.errorMessage}
                      modify={(state, value) => this.setState({[state]: value})}
                  />
                </Collapse>
                <Footer
                    serverConfig={this.state.serverConfig}
                    clientSettings={this.state.clientSettings}
                    updateServerConfig={(value, config) => this.updateServerConfig(value, config)}
                />
            </div>
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
        if (!isValid(config.body, configSchema)) {
            this.setState({serverConfig: null});
            this.setState({
                errorMessage:
                    <Container>
                        {this.createErrorBanner("INVALID_RESPONSE", 400, `Configuration response not valid`)}
                    </Container>
            });
        } else if (config.statusCode === HTTP_OK) {
            console.log("Switching to server ", this.state.clientSettings.serverPort);
            this.setState({serverConfig: config.body});
            this.setState({errorMessage: null});
        } else {
            this.setState({serverConfig: null});
            this.setState({
                errorMessage:
                    <Container>
                        {this.createErrorBanner(config.statusText, config.statusCode, `Failed to fetch config from ${this.state.clientSettings.serverPort}. Please choose a valid server.`)}
                    </Container>
            });
        }
    }

    createErrorBanner(statusText, statusCode, message) {
        return (
            <ErrorBanner statusText={statusText}
                         statusCode={statusCode}
                         message={message}
            />
        );
    }
}

