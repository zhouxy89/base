import './enzyme.config.js'
import React from 'react'
import {shallow} from 'enzyme'
import Application from '../src/components/Application/Application'



function testInitialState() {

  fetch.mockResponse(JSON.stringify(
      {
        status: 200,
        statusText: 'OK',
        body: {
          'placeAttributes': ["latitude", "longitude", "serverName"],
          'requestType': "config",
          'requestVersion': 1,
          'serverName': "t##..."
        },
        type: 'basic',
        url: 'http://localhost:8088/api/config',
        redirected: false,
        ok: true
      }));

  const app = shallow(<Application/>);

  let actualConfig = app.state().serverConfig;
  let expectedConfig = null;
  expect(actualConfig).toEqual(expectedConfig);

  let actualOptions = app.state().planOptions;
  let expectedOptions = {
    units: {miles: 3959, kilometers: 6371},
    activeUnit: 'miles'
  };

  expect(actualOptions).toEqual(expectedOptions);
}

test("Testing Application's initial state", testInitialState);

function testUpdateOption() {
  const app = shallow(<Application/>);

  app.instance().updatePlanOption("activeUnit", "kilometers");

  let actualUnit = app.state().planOptions.activeUnit;
  let expectedUnit = "kilometers";
  expect(actualUnit).toEqual(expectedUnit);
}

test("Testing Application's updatePlanOption function", testUpdateOption);
