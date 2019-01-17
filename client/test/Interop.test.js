import './enzyme.config.js';
import React from 'react';
import {Input} from 'reactstrap';
import {mount, shallow} from 'enzyme';
import Application from '../src/components/Application/Application';
import Interop from '../src/components/Application/Settings/Interop';

const startProperties = {
  'serverPort': 'black-bottle.cs.colostate.edu:31400',
  'updateSetting': () => {
  }
};

function testInputExists() {
  const interop = shallow(<Interop serverPort={startProperties.serverPort}
                                   updateSetting={startProperties.updateSetting}/>);

  expect(interop.contains(<Input onChange={interop.instance().updateInputText}
                                 value={interop.state().inputText}
                                 placeholder={startProperties.serverPort}/>)).toEqual(true);
}

test('Testing that an Input is rendered', testInputExists);

function testupdateInputText() {
  const interop = mount(<Interop serverPort={startProperties.serverPort}
                                 updateSetting={startProperties.updateSetting}/>);

  expect(interop.state().inputText).toEqual('');

  let inputText = 'Fake input text';
  simulateOnChangeEvent(inputText, interop);
  expect(interop.state().inputText).toEqual(inputText);
}

function simulateOnChangeEvent(inputText, reactWrapper) {
  let event = {target: {value: inputText}};
  reactWrapper.find('Input').simulate('change', event);
  reactWrapper.update();
}

test('Testing that the onChange event for Input updates the inputText field in'
    + 'state', testupdateInputText);

function testUpdateServerPort() {
  mockConfigResponse();

  const application = mount(<Application/>);

  let actualBeforeServerPort = application.state().clientSettings.serverPort;
  let expectedBeforeServerPort = location.hostname + ':';
  expect(actualBeforeServerPort).toEqual(expectedBeforeServerPort);

  const interop = application.find('Interop');

  let inputText = 'black-bottle.cs.colostate.edu:31400';
  simulateOnChangeEvent(inputText, interop);
  interop.find('form').simulate('submit', { target: interop.find('Input') } );

  let actualAfterServerPort = application.state().clientSettings.serverPort;
  let expectedAfterServerPort = inputText;
  expect(actualAfterServerPort).toEqual(expectedAfterServerPort);
}

test('Testing that the onClick event for the form updates the serverPort field '
    + 'in Application', testUpdateServerPort);

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