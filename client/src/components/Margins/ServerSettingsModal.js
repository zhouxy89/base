import React, {Component} from 'react';
import {Button, Input, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

import {sendServerRequest} from "../../api/restfulAPI";
import {isValid} from "../../utils/Utils";

import * as configSchema from "../../../schemas/TIPConfigResponseSchema";

export default class ServerSettingsModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputText: this.props.clientSettings.serverPort,
            validServer: true,
            validSave: false,
            config: {}
        }
    }

    render() {
        let currentServerName = this.props.serverConfig && this.state.validServer ? this.props.serverConfig.serverName : '';
        if (this.state.config && Object.keys(this.state.config).length > 0) {
            currentServerName = this.state.config.body.serverName;
        }
        return (
            <Modal isOpen={this.props.modalOpen} toggle={() => this.props.toggleModal()}>
                <ModalHeader toggle={() => this.props.toggleModal()}>Server Connection</ModalHeader>
                <ModalBody>
                    <p>Name: {currentServerName}</p>
                    <p style={{float: "left"}}>URL:</p>
                    <div style={{overflow: "hidden", "paddingLeft": ".5em"}}>
                        <Input onChange={(e) => this.updateInput(e.target.value)}
                               value={this.state.inputText}
                               valid={this.state.validServer}
                               invalid={!this.state.validServer}
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={() => this.resetModalState()}>Cancel</Button>
                    <Button onClick={() => {
                        this.props.updateServerConfig(this.state.inputText, this.state.config);
                        this.resetModalState();
                    }}
                            disabled={!this.state.validSave}
                    >
                        Save
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }

    resetModalState() {
        this.props.toggleModal();
        this.setState({
            inputText: this.props.clientSettings.serverPort,
            validServer: true,
            validSave: false,
            config: {}
        });
    }

    updateInput(value) {
        this.setState({inputText: value}, () => {
                if (value !== "https:") {
                    sendServerRequest('config', value).then(config => {
                        this.processConfigResponse(config);
                    });
                } else {
                    this.setState({validServer: false, validSave: false, config: {}});
                }
            }
        );
    }

    processConfigResponse(config) {
        if (!isValid(config.body, configSchema) || !(config.statusCode >= 200 && config.statusCode <= 299)) {
            this.setState({validServer: false, validSave: false, config: {}});
        } else {
            this.setState({validServer: true, validSave: true, config: config})
        }
    }
}
