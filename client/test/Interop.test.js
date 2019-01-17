import './enzyme.config.js';
import React from 'react';
import {mount, shallow} from 'enzyme';
import {sendServerRequest} from '../src/api/restfulAPI';
import Application from '../src/components/Application/Application';
import Interop from '../src/components/Application/Settings/Interop';
import Settings from '../src/components/Application/Settings/Settings';


function testApiCall() {
  fetch.mockResponse(JSON.stringify(
      {
        status: 200,
        statusText: 'OK',
        body: {
          'placeAttributes': ["latitude", "longitude", "serverName"],
          'requestType': "config",
          'requestVersion': 1,
          'serverName': "t##..."},
        type: 'basic',
        url: 'http://localhost:8088/api/config',
        redirected: false,
        ok: true}));

  /*
  expect.assertions(1);
  return sendServerRequest('black-bottle.cs.colostate.edu:31400', 'config')
  .then(response => {
    expect(response).toEqual({'body': { 'body': 1234, 'status': 200, 'statusText': 'OK'},'statusCode': 200, 'statusText': 'OK'});
  });
  */

  const app = mount(<Application/>);

}


test('testing api call', testApiCall);
