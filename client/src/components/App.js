import React, { Component } from "react";
import { Collapse } from "reactstrap";

import Header from "./Margins/Header";
import About from "./About/About.js";
import Atlas from "./Atlas/Atlas";
import Footer from "./Margins/Footer";

import { SnackbarProvider, useSnackbar } from 'notistack';

import { LOG } from "../utils/constants";
import { HTTP_BAD_REQUEST, HTTP_OK } from "../utils/constants";

import * as configSchema from "../../schemas/TIPConfigResponseSchema";

import { getOriginalServerPort, sendServerRequest, isJsonResponseValid } from "../utils/restfulAPI";

class App extends Component {

    render() {
        return (
            <SnackbarProvider maxSnack={3} preventDuplicate>
                <MiddleMan />
            </SnackbarProvider>
        );
    }
}

export const MiddleMan = props => {

    const { enqueueSnackbar } = useSnackbar();
    const produceSnackBar = (message, variant) => enqueueSnackbar(message, { variant: variant });

    return( <MainApp createErrorMessage={produceSnackBar}/> );
};

export class MainApp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showAbout: false,
            serverSettings: {serverPort: getOriginalServerPort(), serverConfig: null},
        };

        this.toggleAbout = this.toggleAbout.bind(this);
        this.processServerConfigSuccess = this.processServerConfigSuccess.bind(this);

        sendServerRequest('config', this.state.serverSettings.serverPort).then(config => {
            this.processConfigResponse(config);
        });
    }

    render() {
        return (
            <>
                <Header toggleAbout={this.toggleAbout}/>
                {this.renderAbout()}
                {this.renderAtlas()}
                <Footer
                    serverSettings={this.state.serverSettings}
                    processServerConfigSuccess={this.processServerConfigSuccess}
                />
            </>
        );
    }

    renderAbout() {
        return(
            <Collapse isOpen={this.state.showAbout}>
                <About closePage={this.toggleAbout}/>
            </Collapse>
        );
    }

    renderAtlas() {
        return (
            <Collapse isOpen={!this.state.showAbout}>
                <Atlas createErrorMessage={this.props.createErrorMessage}/>
            </Collapse>
        );
    }

    toggleAbout() {
        this.setState({showAbout: !this.state.showAbout});
    }

    processConfigResponse(configResponse) {
        if(!isJsonResponseValid(configResponse.body, configSchema)) {
            this.processServerConfigError("Configuration Response Not Valid. Check The Server.");
        } else if(configResponse.statusCode === HTTP_OK) {
            this.processServerConfigSuccess(configResponse.body);
        } else {
            this.processServerConfigError("An Unknown Error Has Occurred. Please Refresh The Page.");
        }
    }

    processServerConfigSuccess(config, port=this.state.serverSettings.serverPort) {
        LOG.info("Switching to server ", this.state.serverSettings.serverPort);
        let updatedSettings = { serverConfig: config, serverPort: port };
        this.setState({serverSettings: updatedSettings});
    }

    processServerConfigError(message) {
        LOG.error(message);
        let updatedSettings = Object.assign(this.state.serverSettings);
        updatedSettings.serverConfig = null;
        this.setState({serverSettings: updatedSettings});
        this.props.createErrorMessage(message, "error");
    }
}

export default App;