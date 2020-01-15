import React, {Component} from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import './tripcowebstyle.css';

import Header from './Margins/Header';
import Application from './Application/Application';
import Footer from './Margins/Footer/Footer';

import {getOriginalServerPort, sendServerRequest} from "../api/restfulAPI";
import {isValid} from "../utils/Utils";
import * as configSchema from "../../schemas/TIPConfigResponseSchema";
import {Container} from "reactstrap";
import ErrorBanner from "./Application/ErrorBanner";

export default class App extends Component {

    constructor(props) {
        super(props);

        this.pages = [
            {title: 't## team name', page: ''},
            {title: 'Calculator', page: 'calc'},
            {title: 'Options', page: 'options'},
            {title: '\u2699', page: 'settings'}
        ];

        this.state = {
            current_page: this.pages[0].page,
            serverConfig: null,
            clientSettings: {serverPort: getOriginalServerPort()},
            errorMessage: null
        };

        sendServerRequest('config', this.state.clientSettings.serverPort).then(config => {
            this.processConfigResponse(config);
        });
    }

    render() {
        return (
            <div className="csu-branding">
                <Header
                    pages={this.pages}
                    setAppPage={(page) => this.setState({current_page: page})
                    }
                />
                <Application
                    page={this.state.current_page}
                    serverConfig={this.state.serverConfig}
                    clientSettings={this.state.clientSettings}
                    errorMessage={this.state.errorMessage}
                    modify={(state, value) => this.setState({[state]: value})}
                />
                <Footer
                    serverConfig={this.state.serverConfig}
                    clientSettings={this.state.clientSettings}
                    updateServerConfig={(value, config) => this.updateServerConfig(value, config)}
                />
            </div>
        );
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
        } else if (config.statusCode >= 200 && config.statusCode <= 299) {
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

