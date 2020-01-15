import React, {Component} from 'react';

import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Input} from 'reactstrap';

export default class ServerSettingsModal extends Component {

    constructor(props) {
        super(props);
        this.state = {inputText: this.props.clientSettings.serverPort};

        this.updateServerPort = this.updateServerPort.bind(this);
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
                            <p>Current server name:</p>
                            <Input value={currentServerName} disabled='disabled' className='font-weight-semibold'/>
                            <p>Configure new server:</p>
                            <form onSubmit={this.updateServerPort}>
                                <Input onChange={() => this.setState({inputText: event.target.value})}
                                       value={this.state.inputText}
                                       placeholder={this.props.serverPort}/>
                                <br/>
                                <Button color="secondary" onClick={() => this.props.toggleModal()}>Cancel</Button>
                                <Button type='submit'>Configure</Button>
                            </form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }

    updateServerPort(serverPort) {
        serverPort.preventDefault();
        this.props.updateSetting('serverPort', this.state.inputText);
    }
}
