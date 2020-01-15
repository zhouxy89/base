import React, {Component} from 'react';
import {Button} from 'reactstrap'

import ServerSettingsModal from './ServerSettingsModal'

import '../colostatewebstyle.css';

export default class Footer extends Component {

    constructor(props) {
        super(props);
        this.state = {modalOpen: false}
    }

    render() {
        return (
            <div className="add-footer">
                <div className="application-width">
                    <div className="footer-container">
                        <div className="footer-height">
                            {this.renderServerInformation()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderServerInformation() {
        let serverName = "Unknown";
        if(this.props.serverConfig && this.props.serverConfig.serverName) {
            serverName = this.props.serverConfig.serverName;
        }
        return(
            <div>
                Connected to {serverName} (
                <Button color="link" onClick={() => this.setState({modalOpen: true})}>
                    {this.props.clientSettings.serverPort}
                </Button> )
                <ServerSettingsModal
                    modalOpen={this.state.modalOpen}
                    toggleModal={(modalOpen = !this.state.modalOpen) => this.setState({modalOpen: modalOpen})}
                    serverConfig={this.props.serverConfig}
                    clientSettings={this.props.clientSettings}
                    updateServerConfig={this.props.updateServerConfig}
                />
            </div>
        );
    }
}
