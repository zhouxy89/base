import React, { Component } from "react";
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import { sendServerRequest } from "../../utils/restfulAPI";
import { isJsonResponseValid } from "../../utils/restfulAPI";

import * as configSchema from "../../../schemas/TIPConfigResponseSchema";
import { HTTP_OK } from "../Constants";

export default class ServerSettings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputText: this.props.serverSettings.serverPort,
            validServer: true,
            validSave: false,
            config: {}
        }
    }

    render() {
        let currentServerName = this.props.serverSettings.serverConfig && this.state.validServer ? this.props.serverSettings.serverConfig.serverName : '';
        if (this.state.config && Object.keys(this.state.config).length > 0) {
            currentServerName = this.state.config.body.serverName;
        }
        return (
            <div>
                <Modal isOpen={this.props.isOpen} toggle={() => this.props.toggleOpen()}>
                    <ModalHeader toggle={() => this.props.toggleOpen()}>Server Connection</ModalHeader>
                    {this.renderSettings(currentServerName)}
                    {this.renderActions()}
                </Modal>
            </div>
        );
    }

    renderSettings(currentServerName) {
        return (
            <ModalBody>
                <p>Name: {currentServerName}</p>
                <p style={{float: "left"}}>URL:</p>
                <div style={{overflow: "hidden", "paddingLeft": ".5em"}}>
                    <Input onChange={(e) => this.updateInput(e.target.value)}
                           value={this.state.inputText}
                           placeholder={this.props.serverPort}
                           valid={this.state.validServer}
                           invalid={!this.state.validServer}
                    />
                </div>
            </ModalBody>
        );
    }

    renderActions() {
        return (
            <ModalFooter>
                <Button color="secondary" onClick={() => this.resetServerSettingsState()}>Cancel</Button>
                <Button onClick={() =>
                {
                    this.props.updateServerConfig(this.state.config.body, this.state.inputText);
                    this.resetServerSettingsState();
                }}
                        disabled={!this.state.validSave}
                >
                    Save
                </Button>
            </ModalFooter>
        );
    }

    updateInput(value) {
        this.setState({inputText: value}, () => {
            if (this.shouldAttemptConfigRequest(value)) {
                sendServerRequest("config", value).then(config => {
                    this.processConfigResponse(config);
                });
            } else {
                this.setState({validServer: false, validSave: false, config: {}});
            }
        });
    }

    shouldAttemptConfigRequest(resource) {
        const urlRegex = /https?:\/\/.+/;
        return resource.match(urlRegex) !== null && resource.length > 15;
    }

    processConfigResponse(config) {
        if(!isJsonResponseValid(config.body, configSchema) || config.statusCode !== HTTP_OK) {
            this.setState({validServer: false, validSave: false, config: false});
        } else {
            this.setState({validServer: true, validSave: true, config: config});
        }
    }

    resetServerSettingsState() {
        this.props.toggleOpen();
        this.setState({
            inputText: this.props.serverSettings.serverPort,
            validServer: true,
            validSave: false,
            config: false
        });
    }
}
