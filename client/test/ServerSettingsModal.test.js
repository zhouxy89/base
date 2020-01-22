import './enzyme.config.js'
import React from 'react'
import {mount, shallow} from 'enzyme'

import App from "../src/components/App"
import Footer from '../src/components/Margins/Footer'
import ServerSettingsModal from '../src/components/Margins/ServerSettingsModal'

import {Button, Input} from 'reactstrap'

const startProperties = {
    modalOpen: true,
    serverConfig: {},
    clientSettings: {'serverPort': 'black-bottle.cs.colostate.edu:31400'},
    toggleModal: jest.fn(),
    updateServerConfig: jest.fn(),
};

function testRender() {

    const footer = mount(
        <Footer
            serverConfig={startProperties.serverConfig}
            clientSettings={startProperties.clientSettings.serverPort}
            updateServerConfig={(value, config) => this.updateServerConfig(value, config)}
        />);

    expect(footer.find(<ServerSettingsModal/>).length).toEqual(1);
}

test("Modal component should be rendered inside Footer", testRender);


function testRenderInput() {

    const modal = mount(
        <ServerSettingsModal
            modalOpen={startProperties.modalOpen}
            serverConfig={startProperties.serverConfig}
            clientSettings={startProperties.clientSettings}
            toggleModal={startProperties.toggleModal}
            updateServerConfig={startProperties.updateServerConfig}
        />);

    expect(modal.find(<Input/>).length).toEqual(1);
}

test('An Input field should be rendered inside the Modal', testRenderInput);

function testUpdateInputText() {

    const modal = shallow(
        <ServerSettingsModal
            modalOpen={startProperties.modalOpen}
            serverConfig={startProperties.serverConfig}
            clientSettings={startProperties.clientSettings}
            toggleModal={startProperties.toggleModal}
            updateServerConfig={startProperties.updateServerConfig}
        />);

    expect(modal.state().inputText).toEqual(startProperties.clientSettings.serverPort);

    let inputText = 'Fake Input Text';
    simulateOnChangeEvent(inputText, modal);
    expect(modal.state().inputText).toEqual(inputText);
}

function simulateOnChangeEvent(inputText, reactWrapper) {
    let event = {target: {value: inputText}};
    reactWrapper.find(<Input/>).at(0).simulate('change', event);
    reactWrapper.update();
}

test("onChangeEvent should update the Modal's state", testUpdateInputText);

function testUpdateServerPort() {
    mockConfigResponse();

    const app = mount(<App/>);

    let actualBeforeServerPort = app.state().clientSettings.serverPort;
    let expectedBeforeServerPort = `http://${location.hostname}:`;
    expect(actualBeforeServerPort).toEqual(expectedBeforeServerPort);

    const modal = app.find(<ServerSettingsModal/>);

    let inputText = 'https://black-bottle.cs.colostate.edu:31400';
    simulateOnChangeEvent(inputText, modal);
    interop.find(<Button/>)[1].simulate('onClick', null);

    let actualAfterServerPort = app.state().clientSettings.serverPort;
    expect(actualAfterServerPort).toEqual(inputText);
}

function mockConfigResponse() {
    fetch.mockResponse(JSON.stringify(
        {
            status: 200,
            statusText: 'OK',
            body: {
                'placeAttributes': ["latitude", "longitude", "serverName"],
                'requestType': "config",
                'requestVersion': 1,
                'serverName': "t00"
            },
            type: 'basic',
            url: 'http://localhost:8088/api/config',
            redirected: false,
            ok: true
        }));
}

test('onClick event for Save Button should update server port in App component', testUpdateServerPort);

