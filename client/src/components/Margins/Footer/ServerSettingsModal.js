import React, {Component} from 'react';
import {Button, Input, Modal, ModalBody, ModalHeader} from 'reactstrap';

import {sendServerRequest} from "../../../utils/restfulAPI";
import {isValid} from "../../../api/Utils";
import * as configSchema from "../../../../schemas/TIPConfigResponseSchema";

export default class ServerSettingsModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputText: this.props.clientSettings.serverPort,
            validServer: true,
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
                        <br/>
                        <Button color="secondary" onClick={() => this.props.toggleModal()}>Cancel</Button>
                        <Button onClick={() => this.props.updateServerConfig(this.state.inputText, this.state.config)}
                                disabled={!this.state.validServer}
                        >
                            Save
                        </Button>
                    </ModalBody>
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
            this.setState({validServer: false})
        } else {
            this.setState({validServer: true, config: config})
        }
    }
}
