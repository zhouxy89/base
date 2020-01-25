import './enzyme.config.js'
import React from 'react'
import {mount, shallow} from 'enzyme'

import App from "../src/components/App"
import Footer from '../src/components/Margins/Footer'
import ServerSettingsModal from '../src/components/Margins/ServerSettingsModal'

const startProperties = {
    modalOpen: true,
    serverSettings: {'serverPort': 'black-bottle.cs.colostate.edu:31400', 'serverConfig': {}},
    toggleModal: jest.fn(),
    updateServerConfig: jest.fn(),
};

function testRender() {

    const footer = mount(
        <Footer
            serverSettings={startProperties.serverSettings}
            updateServerConfig={startProperties.updateServerConfig}
        />);

    expect(footer.find('ServerSettingsModal').length).toEqual(1);
}

test("Modal component should be rendered inside Footer", testRender);


function testRenderInput() {

    const modal = mount(
        <ServerSettingsModal
            modalOpen={startProperties.modalOpen}
            serverSettings={startProperties.serverSettings}
            toggleModal={startProperties.toggleModal}
            updateServerConfig={startProperties.updateServerConfig}
        />);

    expect(modal.find('Input').length).toEqual(1);
}

test('An Input field should be rendered inside the Modal', testRenderInput);

function testUpdateInputText() {

    const modal = shallow(
        <ServerSettingsModal
            modalOpen={startProperties.modalOpen}
            serverSettings={startProperties.serverSettings}
            toggleModal={startProperties.toggleModal}
            updateServerConfig={startProperties.updateServerConfig}
        />);

    expect(modal.state().inputText).toEqual(startProperties.serverSettings.serverPort);

    let inputText = 'Fake Input Text';
    simulateOnChangeEvent(inputText, modal);
    expect(modal.state().inputText).toEqual(inputText);
}

function simulateOnChangeEvent(inputText, reactWrapper) {
    let event = {target: {value: inputText}};
    reactWrapper.find('Input').at(0).simulate('change', event);
    reactWrapper.update();
}

test("onChangeEvent should update the Modal's state", testUpdateInputText);

function testUpdateServerPort() {
    mockConfigResponse();

    const app = mount(<App />);
    const modal = shallow(
        <ServerSettingsModal
            modalOpen={startProperties.modalOpen}
            serverSettings={startProperties.serverSettings}
            toggleModal={startProperties.toggleModal}
            updateServerConfig={app.instance().updateServerConfig}
        />);

    let actualBeforeServerPort = app.state().serverSettings.serverPort;
    let expectedBeforeServerPort = `http://${location.hostname}:`;

    let inputText = 'https://black-bottle.cs.colostate.edu:31400';
    simulateOnChangeEvent(inputText, modal);
    modal.find('Button').at(1).simulate('click');

    let actualAfterServerPort = app.state().serverSettings.serverPort;

    expect(actualBeforeServerPort).toEqual(expectedBeforeServerPort);
    expect(actualAfterServerPort).toEqual(inputText);
}

function mockConfigResponse() {
    fetch.mockResponse(JSON.stringify(
        {
            'placeAttributes': ["latitude", "longitude", "name"],
            'requestType': "config",
            'requestVersion': 1,
            'serverName': "t00"
        }));
}

test('onClick event for Save Button should update server port in App component', testUpdateServerPort);

