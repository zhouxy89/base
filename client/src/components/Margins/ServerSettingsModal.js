import React, { Component } from "react";
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import { sendServerRequest } from "../../api/restfulAPI";
import { isValid } from "../../utils/Utils";

import * as configSchema from "../../../schemas/TIPConfigResponseSchema";
import { HTTP_OK } from "../Constants";

export default class ServerSettingsModal extends Component {

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
                <Modal isOpen={this.props.modalOpen} toggle={() => this.props.toggleModal()}>
                    <ModalHeader toggle={() => this.props.toggleModal()}>Server Connection</ModalHeader>
                    {this.renderModalBody(currentServerName)}
                    {this.renderModalButtons()}
                </Modal>
            </div>
        );
    }

    renderModalBody(currentServerName) {
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

    renderModalButtons() {
        return (
            <ModalFooter>
                <Button color="secondary" onClick={() => this.resetModalState()}>Cancel</Button>
                <Button onClick={() =>
                {
                    this.props.updateServerConfig(this.state.config.body, this.state.inputText);
                    this.resetModalState();
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
            if (this.isValidUrl(value)) {
                sendServerRequest("config", value).then(config => {
                    this.processConfigResponse(config);
                });
            } else {
                this.setState({validServer: false, validSave: false, config: {}});
            }
        });
    }

    isValidUrl(resource) {
        const urlRegex = /https?:\/\/.+/;
        return resource.match(urlRegex) !== null;
    }

    processConfigResponse(config) {
        if(!isValid(config.body, configSchema) || config.statusCode !== HTTP_OK) {
            this.setState({validServer: false, validSave: false, config: false});
        } else {
            this.setState({validServer: true, validSave: true, config: config});
        }
    }

    resetModalState() {
        this.props.toggleModal();
        this.setState({
            inputText: this.props.serverSettings.serverPort,
            validServer: true,
            validSave: false,
            config: false
        });
    }
}
