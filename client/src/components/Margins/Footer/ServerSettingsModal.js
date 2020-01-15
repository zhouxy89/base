import React, {Component} from 'react';
import {Button, Input, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

import {sendServerRequest} from "../../../api/restfulAPI";
import {isValid} from "../../../utils/Utils";

import * as configSchema from "../../../../schemas/TIPConfigResponseSchema";

export default class ServerSettingsModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputText: this.props.clientSettings.serverPort,
            validServer: true,
            validSave: false,
            config: ''
        }
    }

    render() {
        let currentServerName = 'Unknown';
        if (this.props.serverConfig) {
            currentServerName = this.props.serverConfig.serverName;
        }
        return (
            <div>
                <Modal isOpen={this.props.modalOpen} toggle={() => this.props.toggleModal()}>
                    <ModalHeader toggle={() => this.props.toggleModal()}>Interop Settings</ModalHeader>
                    <ModalBody>
                        <p>Current server name: {currentServerName}</p>
                        <p>Configure new server:</p>
                        <Input onChange={(e) => this.updateInput(e.target.value)}
                               value={this.state.inputText}
                               placeholder={this.props.serverPort}
                               valid={this.state.validServer}
                               invalid={!this.state.validServer}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={() => this.props.toggleModal()}>Cancel</Button>
                        <Button onClick={() => {
                            this.props.updateServerConfig(this.state.inputText, this.state.config);
                            this.props.toggleModal();
                        }}
                                disabled={!this.state.validSave}
                        >
                            Save
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

    updateInput(value) {
        this.setState({inputText: value}, () => {
                sendServerRequest('config', value).then(config => {
                    this.processConfigResponse(config);
                });
            }
        );
    }

    processConfigResponse(config) {
        if (!isValid(config.body, configSchema) || !(config.statusCode >= 200 && config.statusCode <= 299)) {
            this.setState({validServer: false});
            this.setState({validSave: false})
        } else {
            this.setState({validServer: true, validSave: true, config: config})
        }
    }
}
